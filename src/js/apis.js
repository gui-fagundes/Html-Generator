// apis.js
export function initCepSection() {
  const btn = document.getElementById("buscarCepBtn");
  if (btn) {
    btn.addEventListener("click", buscarCep);
  }

  const callApisBtn = document.getElementById("callapis");
  if (callApisBtn) {
    callApisBtn.addEventListener("click", async () => {
      const results = await consultarAPIS();
      mostrarResultadosAPIs(results);
    });
  }
}

export async function buscarCep() {
  try {
    const cepInput = document.getElementById("cepInput");
    if (!cepInput) return;

    const cep = cepInput.value.replace(/\D/g, "");
    if (cep.length !== 8) {
      alert("CEP inválido. Deve conter 8 dígitos.");
      return;
    }

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado.");
      return;
    }

    const container = document.getElementById("generatedAPIcalls");
    if (!container) return;

    container.innerHTML = `
      <div class="p-4 border rounded-md bg-gray-50">
        <h2 class="text-xl font-bold mb-2">Resultado da Consulta de CEP</h2>
        <div class="grid grid-cols-2 gap-2">
          <p><strong>CEP:</strong> ${data.cep || 'Não informado'}</p>
          <p><strong>Logradouro:</strong> ${data.logradouro || 'Não informado'}</p>
          <p><strong>Bairro:</strong> ${data.bairro || 'Não informado'}</p>
          <p><strong>Cidade:</strong> ${data.localidade || 'Não informado'}</p>
          <p><strong>Estado:</strong> ${data.uf || 'Não informado'}</p>
          <p><strong>DDD:</strong> ${data.ddd || 'Não informado'}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    alert("Erro ao buscar CEP. Por favor, tente novamente.");
  }
}

export async function consultarAPIS() {
  try {
    const [ipData, currencyData, todoData] = await Promise.all([
      fetch("https://dummyjson.com/ip").then(res => res.json()),
      fetch("https://economia.awesomeapi.com.br/last/USD-BRL").then(res => res.json()),
      fetch("https://jsonplaceholder.typicode.com/todos/1").then(res => res.json())
    ]);

    return [
      { name: "IP API", data: ipData },
      { name: "Currency API", data: currencyData },
      { name: "Todo API", data: todoData }
    ];
  } catch (error) {
    console.error("Erro ao consultar APIs:", error);
    return [];
  }
}

function mostrarResultadosAPIs(apisData) {
  const container = document.getElementById("generatedAPIcalls");
  if (!container) return;

  container.innerHTML = '';

  const resultsDiv = document.createElement("div");
  resultsDiv.className = "p-4 border rounded-md bg-gray-50";

  const title = document.createElement("h2");
  title.textContent = "Resultados das APIs";
  title.className = "text-xl font-bold mb-4";
  resultsDiv.appendChild(title);

  apisData.forEach((apiData, index) => {
    const apiDiv = document.createElement("div");
    apiDiv.className = "mb-4 p-3 border-b";

    const apiTitle = document.createElement("h3");
    apiTitle.textContent = `${apiData.name}`;
    apiTitle.className = "text-lg font-semibold mb-2";
    apiDiv.appendChild(apiTitle);

    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(apiData.data, null, 2);
    pre.className = "bg-white p-2 rounded text-sm overflow-x-auto";
    apiDiv.appendChild(pre);

    resultsDiv.appendChild(apiDiv);
  });

  container.appendChild(resultsDiv);
}