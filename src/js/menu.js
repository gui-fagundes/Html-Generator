const links = [];

export function addLink() {
  if (links.length > 5) return;
  const txt = document.querySelector("#linkText").value.trim();
  if (!txt) return;
  const url = "";
  links.push({ txt, url });
  document.querySelector("#linkText").value = "";
  buildMenu();
}

export function buildMenu() {
  const color = document.querySelector("#menuLinkColor").value;
  const container = document.createElement("div");
  container.className = "flex flex-col items-center gap-2 p-4";

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

export function initMenuEvents() {
  document.querySelector("#linkText").nextElementSibling.addEventListener("click", addLink);
  document.querySelector("#menuLinkColor").addEventListener("input", buildMenu);
}