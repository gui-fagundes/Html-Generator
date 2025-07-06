const galleryImgs = [];

export function addGalleryImage(e) {
  galleryImgs.push(...e.target.files);
  buildGallery();
}

export function buildGallery() {
  if (galleryImgs.length == 0) return;
  const grid = document.createElement("div");
  grid.className = "grid grid-cols-2 md:grid-cols-4 gap-2";
  const galleryTitle = document.createElement("h1");
  galleryTitle.innerHTML = "Galeria";
  galleryTitle.className = "col-span-4 text-center";
  grid.appendChild(galleryTitle);
  galleryImgs.forEach((f) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(f);
    img.className = "w-full h-32 object-cover rounded";
    img.alt = "imagem enviada";
    grid.appendChild(img);
  });
  document.querySelector("#generatedGallery").innerHTML = "";
  document.querySelector("#generatedGallery").appendChild(grid);
}

export function initGalleryEvents() {
  document.querySelector("#galleryImage").addEventListener("change", addGalleryImage);
}