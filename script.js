document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep-input");
  const searchBtn = document.getElementById("search-btn");
  const addressCard = document.getElementById("address-card");

  const searchCEP = async () => {
    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {
      showError("Por favor, digite um CEP válido com 8 dígitos.");
      return;
    }

    showLoading();

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new Error("Não foi possível conectar ao serviço de CEP.");
      }

      const data = await response.json();

      if (data.erro) {
        showError("CEP não encontrado. Verifique o número digitado.");
      } else {
        displayAddress(data);
      }
    } catch (error) {
      showError("Ocorreu um erro ao buscar o CEP. Tente novamente.");
      console.error("Erro na API de CEP:", error);
    }
  };

  const showLoading = () => {
    addressCard.classList.remove("hidden");
    addressCard.innerHTML = `<p class="error-message" style="color: var(--primary-color);">Buscando...</p>`;
  };

  const showError = (message) => {
    addressCard.classList.remove("hidden");
    addressCard.innerHTML = `<p class="error-message">${message}</p>`;
  };

  const displayAddress = (data) => {
    addressCard.classList.remove("hidden");
    addressCard.innerHTML = `
            <p><strong>Rua:</strong> ${data.logradouro || "N/A"}</p>
            <p><strong>Bairro:</strong> ${data.bairro || "N/A"}</p>
            <p><strong>Cidade:</strong> ${data.localidade || "N/A"}</p>
            <p><strong>Estado:</strong> ${data.uf || "N/A"}</p>
            <p><strong>IBGE:</strong> ${data.ibge || "N/A"}</p>
        `;
  };

  searchBtn.addEventListener("click", searchCEP);

  cepInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchCEP();
    }
  });
});
