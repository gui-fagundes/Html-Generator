// Header builder

function buildHeader() {
  const text = document.querySelector("#headerText").value.trim();
  const color = document.querySelector("#headerTextColor").value;
  const bgColor = document.querySelector("#headerBgColor").value;
  const iconF = document.querySelector("#headerIcon").files[0];

  const header = document.createElement("header");
  header.className = "flex items-center gap-4 p-4 shadow w-full";
  header.style.background = bgColor;

  if (iconF) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(iconF);
    img.alt = "Header Icon";
    img.className = "w-10 h-10 object-contain";
    header.appendChild(img);
  }

  const h1 = document.createElement("h1");
  h1.textContent = text || "Texto do Header";
  h1.className = "text-2xl font-bold flex-1 text-center";
  h1.style.color = color;
  header.appendChild(h1);

  document.querySelector("#generatedHeader").innerHTML = "";
  document.querySelector("#generatedHeader").appendChild(header);
}

// Menu Logic

const links = [];
function addLink() {
  if(links.length > 5) return;
  const txt = document.querySelector("#linkText").value.trim();
  if (!txt) return;
  const url = "";
  links.push({ txt, url });
  document.querySelector("#linkText").value = "";
  buildMenu();
}

function buildMenu() {
  const color = document.querySelector("#menuLinkColor").value;
  const imgF = document.querySelector("#menuImage").files[0];

  const container = document.createElement("div");
  container.className = "flex flex-col items-center gap-2 p-4";

  if (imgF) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(imgF);
    img.alt = "Menu Image";
    img.className = "w-32 h-32 object-cover";
    container.appendChild(img);
  }

  const nav = document.createElement("nav");
  nav.className = "flex gap-4 flex-wrap justify-center";
  links.forEach(({ txt, url }) => {
    const a = document.createElement("a");
    a.href = url;
    a.textContent = txt;
    a.style.color = color;
    a.className = "font-medium underline";
    nav.appendChild(a);
  });
  container.appendChild(nav);

  document.querySelector("#generatedMenu").innerHTML = "";
  document.querySelector("#generatedMenu").appendChild(container);
}

// Gallery Logic
const galleryImgs = [];
function addGalleryImage(e) {
  galleryImgs.push(...e.target.files);
  buildGallery();
}
function buildGallery() {
  if(galleryImgs.length == 0) return;
  const grid = document.createElement("div");
  grid.className = "grid grid-cols-2 md:grid-cols-4 gap-2";
  const galleryTitle = document.createElement("h1");
  galleryTitle.innerHTML = "Galeria";
  galleryTitle.className = "col-span-4 text-center"
  grid.appendChild(galleryTitle);
  galleryImgs.forEach((f) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(f);
    img.className = "w-full h-32 object-cover rounded";
    grid.appendChild(img);
  });
  document.querySelector("#generatedGallery").innerHTML = "";
  document.querySelector("#generatedGallery").appendChild(grid);
}

// Form Logic
const formFields = [];
function addFormInput() {
  const label = document.querySelector("#formInputTitle").value.trim();
  const type = document.querySelector("#formInputType").value;
  if (!label) return;
  formFields.push({ label, type });
  document.querySelector("#formInputTitle").value = "";
  buildForm();
}

let submitAdded = false;
function addSubmitBtn() {
  if (submitAdded) return;
  submitAdded = true;
  buildForm();
}

function buildForm() {
  if (document.querySelector("#formTitle").value.trim() == "") return;
  const titleTxt =
    document.querySelector("#formTitle").value.trim() || "";
  const form = document.createElement("form");
  form.className = "flex flex-col gap-4 p-4 border rounded";

  const title = document.createElement("h2");
  title.textContent = titleTxt;
  title.className = "text-xl font-semibold";
  form.appendChild(title);

  formFields.forEach(({ label, type }) => {
    const div = document.createElement("div");
    const lab = document.createElement("label");
    lab.textContent = label;
    lab.className = "block mb-1";
    const inp = document.createElement("input");
    inp.type = type;
    inp.className = "w-full border p-2 rounded";
    div.appendChild(lab);
    div.appendChild(inp);
    form.appendChild(div);
  });

  if (submitAdded) {
    const btn = document.createElement("button");
    btn.type = "submit";
    btn.textContent = "Enviar";
    btn.className = "px-4 py-2 bg-blue-600 text-white rounded";
    form.appendChild(btn);
  }

  document.querySelector("#generatedForm").innerHTML = "";
  document.querySelector("#generatedForm").appendChild(form);
}

/* === Footer === */
function buildFooter() {
  const msg =
    document.querySelector("#footerCopyright").value.trim() ||
    "© 2025 All Rights Reserved";
  const footer = document.createElement("footer");
  footer.className = "text-center p-4 bg-gray-200";
  footer.textContent = msg;
  document.querySelector("#generatedFooter").innerHTML = "";
  document.querySelector("#generatedFooter").appendChild(footer);
}

// Export HTML
function exportGeneratedPage() {
  // Ensure components are built
  buildHeader();
  buildMenu();
  buildGallery();
  buildForm();
  buildFooter();

  // Clone generated page portion of html
  const page = document.querySelector("#generatedPage").cloneNode(true);

  // Wrap in basic html boilerplate + Tailwind CDN
  const html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src=\"https://cdn.tailwindcss.com\"></script><title>Pagina Exportada</title></head><body class=\"p-4\">${page.innerHTML}</body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pagina-gerada.html";
  a.click();
}

// Event Listeners

// Header
document.querySelector("#headerText").addEventListener("input", buildHeader);
document
  .querySelector("#headerTextColor")
  .addEventListener("input", buildHeader);
document.querySelector("#headerBgColor").addEventListener("input", buildHeader);
document.querySelector("#headerIcon").addEventListener("change", buildHeader);

// Menu
document
  .querySelector("#linkText")
  .nextElementSibling.addEventListener("click", addLink);
document.querySelector("#menuLinkColor").addEventListener("input", buildMenu);
document.querySelector("#menuImage").addEventListener("change", buildMenu);

// Gallery
document
  .querySelector("#galleryImage")
  .addEventListener("change", addGalleryImage);

// Form
document.querySelector("#formTitle").addEventListener("input", buildForm);
document.querySelector("#formInputType").addEventListener("change", buildForm);
document
  .querySelector("#formInputTitle")
  .nextElementSibling.addEventListener("click", addFormInput);
document
  .querySelector("#formSubmitButton")
  .addEventListener("click", addSubmitBtn);

// Footer
document
  .querySelector("#footerCopyright")
  .addEventListener("input", buildFooter);

// Build Inicial
buildHeader();
buildMenu();
buildGallery();
buildForm();
buildFooter();
