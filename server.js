const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const languages = {
  python: (code) => spawn('python3', ['-c', code]),
  java: (code, cb) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'java-'));
    const javaFile = path.join(tmpDir, 'Main.java');
    fs.writeFileSync(javaFile, code);
    const compileProcess = spawn('javac', [javaFile]);
    let compileOutput = '';
    compileProcess.stdout.on('data', (data) => {
      compileOutput += data.toString();
    });
    compileProcess.stderr.on('data', (data) => {
      compileOutput += data.toString();
    });
    compileProcess.on('close', (code) => {
      if (code !== 0) {
        // Remover os arquivos após a compilação falha
        fs.rm(tmpDir, { recursive: true, force: true }, (err) => {
          if (err) {
            console.error(err);
          }
          cb(compileOutput);
        });
        return;
      }
      const javaProcess = spawn('java', ['-cp', tmpDir, 'Main']);
      let output = '';
      javaProcess.stdout.on('data', (data) => {
        output += data.toString();
      });
      javaProcess.stderr.on('data', (data) => {
        output += data.toString();
      });
      javaProcess.on('close', () => {
        // Remover os arquivos após a execução
        fs.rm(tmpDir, { recursive: true, force: true }, (err) => {
          if (err) {
            console.error(err);
          }
          cb(output);
        });
      });
    });
  },
};

app.post('/run', (req, res) => {
  const { code, language } = req.body;
  const runner = languages[language];
  if (!runner) {
    res.status(400).json({ output: `Linguagem ${language} não suportada` });
    return;
  }
  if (language === 'java') {
    runner(code, (output) => {
      res.json({ output });
    });
  } else {
    const process = runner(code);
    let output = '';
    process.stdout.on('data', (data) => {
      output += data.toString();
    });
    process.stderr.on('data', (data) => {
      output += data.toString();
    });
    process.on('close', () => {
      res.json({ output });
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});