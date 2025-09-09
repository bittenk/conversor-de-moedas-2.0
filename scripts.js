const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const currencySelectFrom = document.querySelector(".currency-select-from");

// Objeto unificado com todos os dados das moedas (rate será atualizado pela API)
const currencies = {
  real: {
    name: "Real Brasileiro",
    rate: 1,
    locale: ["pt-BR", "BRL"],
    image: "./assets/real.png",
  },
  dolar: {
    name: "Dólar Americano",
    rate: 0,
    locale: ["en-US", "USD"],
    image: "./assets/dolar.png",
  },
  euro: {
    name: "Euro",
    rate: 0,
    locale: ["de-DE", "EUR"],
    image: "./assets/euro.png",
  },
  libra: {
    name: "Libra Esterlina",
    rate: 0,
    locale: ["en-GB", "GBP"],
    image: "./assets/Libra esterlina.png",
  },
  bitcoin: {
    name: "Bitcoin",
    rate: 0,
    locale: ["en-US", "BTC"],
    image: "./assets/bitcoin.png",
  },
  franco: {
    name: "Franco Suíço",
    rate: 0,
    locale: ["fr-CH", "CHF"],
    image: "./assets/Franco Suíço.png",
  },
  iene: {
    name: "Iene Japonês",
    rate: 0,
    locale: ["ja-JP", "JPY"],
    image: "./assets/iene.png",
  },
  dolarAus: {
    name: "Dólar Australiano",
    rate: 0,
    locale: ["en-AU", "AUD"],
    image: "./assets/Dólar Australiano.png",
  },
  dolarCa: {
    name: "Dólar Canadense",
    rate: 0,
    locale: ["en-CA", "CAD"],
    image: "./assets/Dólar Canadense.png",
  },
  renminbi: {
    name: "Renminbi (Yuan)",
    rate: 0,
    locale: ["zh-CN", "CNY"],
    image: "./assets/Renminbi (Yuan).png",
  },
  peso: {
    name: "Peso Argentino",
    rate: 0,
    locale: ["es-AR", "ARS"],
    image: "./assets/Peso.png",
  },
  lira: {
    name: "Lira Turca",
    rate: 0,
    locale: ["tr-TR", "TRY"],
    image: "./assets/Lira Turca.png",
  },
};

// Função para buscar valores atualizados da API
async function updateRates() {
  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL,CHF-BRL,JPY-BRL,AUD-BRL,CAD-BRL,CNY-BRL,ARS-BRL,TRY-BRL"
    );
    const data = await response.json();

    currencies.dolar.rate = Number(data.USDBRL.high);
    currencies.euro.rate = Number(data.EURBRL.high);
    currencies.libra.rate = Number(data.GBPBRL.high);
    currencies.bitcoin.rate = Number(data.BTCBRL.high);
    currencies.franco.rate = Number(data.CHFBRL.high);
    currencies.iene.rate = Number(data.JPYBRL.high);
    currencies.dolarAus.rate = Number(data.AUDBRL.high);
    currencies.dolarCa.rate = Number(data.CADBRL.high);
    currencies.renminbi.rate = Number(data.CNYBRL.high);
    currencies.peso.rate = Number(data.ARSBRL.high);
    currencies.lira.rate = Number(data.TRYBRL.high);

    console.log("Moedas atualizadas ✅", currencies);
  } catch (error) {
    console.error("Erro ao buscar cotações:", error);
  }
}

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

// Ao carregar a página, atualizar os rates e configurar atualização automática
document.addEventListener("DOMContentLoaded", async () => {
  await updateRates();
  changeCurrencyFrom();
  changeCurrency();

// Atualiza as moedas a cada 5 minutos (300.000 ms)
  setInterval(async () => {
    await updateRates();
    convertValues(); // Atualiza automaticamente a conversão atual
  }, 300000);
});