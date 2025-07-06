const footerColumns = {};
let columnCount = 0;

function addColumn() {
  const footerContainer = document.getElementById("generatedFooter");
  const footerSelect = document.getElementById("footerSelect");
  const footerColumnInput = document.querySelector('input[placeholder="Titulo da Coluna"]');

  const columnTitle = footerColumnInput.value.trim();
  if (!columnTitle) return;

  const columnId = `footer-column-${columnCount++}`;
  footerColumns[columnId] = {
    title: columnTitle,
    items: [],
  };

  const columnDiv = document.createElement("div");
  columnDiv.className = "footer-column p-4";
  columnDiv.id = columnId;

  const columnHeader = document.createElement("h2");
  columnHeader.textContent = columnTitle;
  columnHeader.className = "font-bold mb-2";

  const itemList = document.createElement("ul");
  itemList.className = "footer-items list-disc pl-4 list-none";

  columnDiv.appendChild(columnHeader);
  columnDiv.appendChild(itemList);
  footerContainer.appendChild(columnDiv);

  const option = document.createElement("option");
  option.value = columnId;
  option.textContent = columnTitle;
  footerSelect.appendChild(option);

  footerColumnInput.value = "";
}

function addSubItem() {
  const footerSelect = document.getElementById("footerSelect");
  const selectedColumnId = footerSelect.value;
  const subItemText = document.getElementById("footerSubItemInput").value.trim();
  if (!selectedColumnId || !subItemText) return;

  const column = document.getElementById(selectedColumnId);
  const ul = column.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = subItemText;
  ul.appendChild(li);

  footerColumns[selectedColumnId].items.push(subItemText);
  document.getElementById("footerSubItemInput").value = "";
}

export function initFooterEvents() {
  const addColumnButton = document.querySelector('input[placeholder="Titulo da Coluna"]').nextElementSibling;
  addColumnButton.addEventListener("click", addColumn);

  document.getElementById("addSubItemButton")?.addEventListener("click", addSubItem);
}