const formFields = [];
let submitAdded = false;

export function addFormInput() {
  const label = document.querySelector("#formInputTitle").value.trim();
  const type = document.querySelector("#formInputType").value;
  if (!label) return;
  formFields.push({ label, type });
  document.querySelector("#formInputTitle").value = "";
  buildForm();
}

export function addSubmitBtn() {
  if (submitAdded) return;
  submitAdded = true;
  buildForm();
}

export function buildForm() {
  if (document.querySelector("#formTitle").value.trim() == "") return;
  const titleTxt = document.querySelector("#formTitle").value.trim() || "";
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

export function initFormEvents() {
  document.querySelector("#formTitle").addEventListener("input", buildForm);
  document.querySelector("#formInputType").addEventListener("change", buildForm);
  document.querySelector("#formInputTitle").nextElementSibling.addEventListener("click", addFormInput);
  document.querySelector("#formSubmitButton").addEventListener("click", addSubmitBtn);
}