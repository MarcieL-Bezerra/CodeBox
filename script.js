const editorElement = document.getElementById('editor');
const editor = CodeMirror.fromTextArea(editorElement, {
  mode: "python",
  theme: "default",
  indentUnit: 4,
  indentWithTabs: false,
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  extraKeys: {"Ctrl-Space": "autocomplete"}
});

const runButton = document.getElementById('run-button');
const output = document.getElementById('output');
const languageSelect = document.getElementById('language-select');

languageSelect.addEventListener('change', () => {
  if (languageSelect.value === 'java') {
    editor.setOption("mode", "text/x-java");
    const javaTemplate = `public class Main {
  public static void main(String[] args) {
    // Seu código aqui
  }
}`;
    editor.setValue(javaTemplate);
  } else {
    editor.setOption("mode", "python");
    editor.setValue('');
  }
});

runButton.addEventListener('click', () => {
  const code = editor.getValue();
  const language = languageSelect.value;
  fetch('/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, language }),
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
  editor.setValue('');
  output.innerText = '';
});