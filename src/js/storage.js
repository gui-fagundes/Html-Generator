const STORAGE_KEY = "paginaHTMLGeradaW3C";

function saveToLocalStorage() {
  const page = document.querySelector("#generatedPage").cloneNode(true);

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Página Gerada</title>
  <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-4">
  ${page.innerHTML}
  </body>
  </html>`.trim();

  localStorage.setItem(STORAGE_KEY, htmlContent);
  alert("Código HTML salvo no localStorage!");
}

function loadFromLocalStorage() {
  const html = localStorage.getItem(STORAGE_KEY);
  if (!html) {
    alert("Nenhum código HTML encontrado no localStorage.");
    return;
  }

  const preview = document.querySelector("#generatedPage");
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const generatedContent = doc.body.innerHTML;

  preview.innerHTML = generatedContent;
  alert("Página carregada do localStorage!");
}

function clearLocalStorage() {
  localStorage.removeItem(STORAGE_KEY);
  alert("LocalStorage limpo!");
}

export function initStorageEvents() {
  document.getElementById("saveLocal").addEventListener("click", saveToLocalStorage);
  document.getElementById("loadLocal").addEventListener("click", loadFromLocalStorage);
  document.getElementById("clearLocal").addEventListener("click", clearLocalStorage);
}