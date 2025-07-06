export function initCepSection() {
  const btn = document.getElementById("buscarCepBtn");
  btn.addEventListener("click", buscarCep);
}

export function buscarCep() {
  const cep = document.getElementById("cepInput").value.replace(/\D/g, "");
  if (cep.length !== 8) {
    alert("CEP inválido");
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      const container = document.getElementById("generatedCEP");
      container.innerHTML = `
          <h2 class="text-lg font-bold">Endereço:</h2>
          <p><strong>CEP:</strong> ${data.cep}</p>
          <p><strong>Cidade:</strong> ${data.localidade}</p>
          <p><strong>Estado:</strong> ${data.uf}</p>
        `;
    })
    .catch(() => alert("Erro ao buscar CEP."));
}
