// export.js
import { buildHeader } from './header.js';
import { buildMenu } from './menu.js';
import { buildGallery } from './gallery.js';
import { buildForm } from './form.js';
import { updatePageBackground } from './main.js';

export function exportGeneratedPage() {
  // Reconstroi todos os componentes para garantir que estão atualizados
  buildHeader();
  buildMenu();
  buildGallery();
  buildForm();
  updatePageBackground();

  // Clona a página gerada para exportação
  const page = document.querySelector("#generatedPage").cloneNode(true);

  // Cria o HTML completo da página exportada
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Pagina Exportada</title>
  <style>
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 0.25rem;
      font-family: monospace;
    }
  </style>
</head>
<body class="p-4">
  ${page.innerHTML}
</body>
</html>`;

  // Cria o blob e inicia o download
  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pagina-gerada.html";
  a.click();
}

export function initExportEvents() {
  const exportButton = document.querySelector("#exportButton");
  if (exportButton) {
    exportButton.addEventListener("click", exportGeneratedPage);
  }
}