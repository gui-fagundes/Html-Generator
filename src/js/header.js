export function buildHeader() {
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
  
  export function initHeaderEvents() {
    document.querySelector("#headerText").addEventListener("input", buildHeader);
    document.querySelector("#headerTextColor").addEventListener("input", buildHeader);
    document.querySelector("#headerBgColor").addEventListener("input", buildHeader);
    document.querySelector("#headerIcon").addEventListener("change", buildHeader);
  }