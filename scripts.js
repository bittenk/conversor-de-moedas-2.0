const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const currencySelectFrom = document.querySelector(".currency-select-from");

// Objeto unificado com todos os dados das moedas
const currencies = {
  real: {
    name: "Real Brasileiro",
    rate: 1,
    locale: ["pt-BR", "BRL"],
    image: "./assets/real.png",
  },
  dolar: {
    name: "Dólar Americano",
    rate: 5.51,
    locale: ["en-US", "USD"],
    image: "./assets/dolar.png",
  },
  euro: {
    name: "Euro",
    rate: 6.38,
    locale: ["de-DE", "EUR"],
    image: "./assets/euro.png",
  },
  libra: {
    name: "Libra Esterlina",
    rate: 7.32,
    locale: ["en-GB", "GBP"],
    image: "./assets/Libra esterlina.png",
  },
  bitcoin: {
    name: "Bitcoin",
    rate: 632.425,
    locale: ["en-US", "BTC"],
    image: "./assets/bitcoin.png",
  },
  franco: {
    name: "Franco Suíço",
    rate: 6.85,
    locale: ["fr-CH", "CHF"],
    image: "./assets/Franco Suíço.png",
  },
  iene: {
    name: "Iene Japonês",
    rate: 26.64,
    locale: ["ja-JP", "JPY"],
    image: "./assets/iene.png",
  },
  dolarAus: {
    name: "Dólar Australiano",
    rate: 3.57,
    locale: ["en-AU", "AUD"],
    image: "./assets/Dólar Australiano.png",
  },
  dolarCa: {
    name: "Dólar Canadense",
    rate: 4.01,
    locale: ["en-CA", "CAD"],
    image: "./assets/Dólar Canadense.png",
  },
  renminbi: {
    name: "Renminbi (Yuan)",
    rate: 0.77,
    locale: ["zh-CN", "CNY"],
    image: "./assets/Renminbi (Yuan).png",
  },
  peso: {
    name: "Peso Argentino",
    rate: 0.004,
    locale: ["es-AR", "ARS"],
    image: "./assets/Peso.png",
  },
  lira: {
    name: "Lira Turca",
    rate: 0.14,
    locale: ["tr-TR", "TRY"],
    image: "./assets/Lira Turca.png",
  },
};

function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert"
  );
  const currencyValueConverted = document.querySelector(".currency-value");

  const from = currencies[currencySelectFrom.value];
  const to = currencies[currencySelect.value];

  const realValue = inputCurrencyValue * from.rate;

  currencyValueToConvert.innerHTML = new Intl.NumberFormat(from.locale[0], {
    style: "currency",
    currency: from.locale[1],
  }).format(inputCurrencyValue);

  currencyValueConverted.innerHTML = new Intl.NumberFormat(to.locale[0], {
    style: "currency",
    currency: to.locale[1],
    minimumFractionDigits: currencySelect.value === "bitcoin" ? 8 : 2,
  }).format(realValue / to.rate);
}

// Função genérica para atualizar as informações da moeda
function updateCurrencyInfo(selectElement, nameElement, imageElement) {
  const selectedCurrency = currencies[selectElement.value];
  nameElement.innerHTML = selectedCurrency.name;
  imageElement.src = selectedCurrency.image;
  convertValues();
}

function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImage = document.querySelector(".currency-img");
  updateCurrencyInfo(currencySelect, currencyName, currencyImage);
}

function changeCurrencyFrom() {
  const currencyNameFrom = document.querySelector(".currency-box .currency");
  const currencyImageFrom = document.querySelector(".currency-img-first");
  updateCurrencyInfo(currencySelectFrom, currencyNameFrom, currencyImageFrom);
}

// Eventos
currencySelect.addEventListener("change", changeCurrency);
currencySelectFrom.addEventListener("change", changeCurrencyFrom);
convertButton.addEventListener("click", convertValues);
document.addEventListener("DOMContentLoaded", () => {
  changeCurrencyFrom();
  changeCurrency();
});
