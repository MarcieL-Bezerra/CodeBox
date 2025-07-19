const editor = document.getElementById('editor');
const runButton = document.getElementById('run-button');
const output = document.getElementById('output');
const TAB_SIZE = 4;

// Adicionar tabulação quando apertar a tecla TAB
editor.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const tabNode = document.createTextNode(' '.repeat(TAB_SIZE));
    range.deleteContents();
    range.insertNode(tabNode);
    range.setStartAfter(tabNode);
    range.setEndAfter(tabNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }
});

runButton.addEventListener('click', () => {
  const code = editor.innerText;
  fetch('/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code }),
  })
  .then(response => response.json())
  .then(data => {
    output.innerText = data.output;
  })
  .catch(error => {
    console.error(error);
  });
});

document.getElementById('clear-button').addEventListener('click', () => {
  document.getElementById('editor').innerText = '';
  document.getElementById('output').innerText = '';
});

editor.addEventListener('input', () => {
  const code = editor.innerText;
  const lines = code.split('\n');
  lines.forEach((line, index) => {
    const indent = line.match(/^ */)[0].length;
    if (indent % 4 !== 0) {
      // Adicione uma classe para destacar a identação errada
      const lineElement = document.createElement('div');
      lineElement.textContent = line;
      lineElement.classList.add('indent-error');
      editor.replaceChild(lineElement, editor.childNodes[index]);
    }
  });
});