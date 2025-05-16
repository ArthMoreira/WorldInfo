fetch('https://restcountries.com/v3.1/all')
  .then(resposta => resposta.json())
  .then(dados => {
    console.log(dados); 
   
  })
  .catch(erro => console.error("Erro ao buscar países:", erro));


let dadosPaises = [];

fetch('https://restcountries.com/v3.1/all')
  .then(res => res.json())
  .then(dados => {
    dadosPaises = dados;
    const select = document.getElementById('select-country');

    dadosPaises.sort((a, b) => a.name.common.localeCompare(b.name.common));

    dadosPaises.forEach(pais => {
      const option = document.createElement('option');
      option.value = pais.cca2; 
      option.textContent = pais.name.common;
      select.appendChild(option);
    });
  });

document.getElementById('select-country').addEventListener('change', function () {
  const codigoSelecionado = this.value;
  const pais = dadosPaises.find(p => p.cca2 === codigoSelecionado);

  if (pais) {
    const card = document.getElementById('card-country');
    card.innerHTML = `
      <img src="${pais.flags.svg}" alt="Bandeira de ${pais.name.common}">
      <h2>${pais.name.official}</h2>
      <p><strong>Continente:</strong> ${pais.region}</p>
      <p><strong>Capital:</strong> ${pais.capital?.[0] || 'Sem capital'}</p>
      <p><strong>População:</strong> ${pais.population.toLocaleString()}</p>
      <p><strong>Idioma:</strong> ${Object.values(pais.languages).join(', ')}</p>
      <p><strong>Moeda:</strong> ${Object.values(pais.currencies)[0].name + ' (' + Object.keys(pais.currencies)[0] + ')'}</p>
      <p><strong>Código de chamada:</strong> ${pais.idd.root + pais.idd.suffixes[0]}</p>
      <p><strong>Domínio de internet:</strong> ${pais.tld?.[0]}</p>
    `;
    card.classList.remove('hidden');
  }
});

const regioesTraduzidas = {
  Africa: "África",
  Americas: "Américas",
  Asia: "Ásia",
  Europe: "Europa",
  Oceania: "Oceania"
};

const regiaoOriginal = pais.region;
const regiaoTraduzida = regioesTraduzidas[regiaoOriginal] || regiaoOriginal;


