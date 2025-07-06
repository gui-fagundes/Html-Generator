import { buildHeader } from './header.js';
import { buildMenu } from './menu.js';
import { buildGallery } from './gallery.js';
import { buildForm } from './form.js';
import { updatePageBackground } from './main.js';

export function exportGeneratedPage() {
  buildHeader();
  buildMenu();
  buildGallery();
  buildForm();
  updatePageBackground();

  const page = document.querySelector("#generatedPage").cloneNode(true);

  const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://cdn.tailwindcss.com"></script><title>Pagina Exportada</title></head><body class="p-4">${page.innerHTML}</body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pagina-gerada.html";
  a.click();
}

export function initExportEvents() {
  document.querySelector("#exportButton")?.addEventListener("click", exportGeneratedPage);
}