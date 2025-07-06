import { initCepSection } from './apis.js';
import { buildHeader, initHeaderEvents } from './header.js';
import { buildMenu, addLink, initMenuEvents } from './menu.js';
import { buildGallery, addGalleryImage, initGalleryEvents } from './gallery.js';
import { buildForm, addFormInput, addSubmitBtn, initFormEvents } from './form.js';
import { initFooterEvents } from './footer.js';
import { initStorageEvents } from './storage.js';
import { exportGeneratedPage, initExportEvents } from './export.js';

document.addEventListener("DOMContentLoaded", () => {
  // Inicializa todas as seções
  initCepSection();
  initHeaderEvents();
  initMenuEvents();
  initGalleryEvents();
  initFormEvents();
  initFooterEvents();
  initStorageEvents();
  initExportEvents();
  
  // Build inicial dos componentes
  buildHeader();
  buildMenu();
  buildGallery();
  buildForm();
  updatePageBackground();
});

function updatePageBackground() {
  const color = document.querySelector("#bodyBgColor").value;
  const page = document.querySelector("#generatedPage");
  page.style.backgroundColor = color;
}