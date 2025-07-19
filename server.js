const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post('/run', (req, res) => {
  const code = req.body.code;
  const pythonProcess = spawn('python3', ['-c', code]);

  let output = '';
  pythonProcess.stdout.on('data', data => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', data => {
    output += data.toString();
  });

  pythonProcess.on('close', () => {
    res.json({ output });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
