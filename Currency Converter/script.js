const apiKey = "b2ea21ed0f55206ef1f02eed";
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const swapBtn = document.getElementById("swap");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");

const currencyFlags = {
  "USD": "us",
  "EUR": "eu",
  "GBP": "gb",
  "INR": "in",
  "PKR": "pk",
  "TRY": "tr",
  "JPY": "jp",
  "CNY": "cn",
  "AUD": "au",
  "CAD": "ca"
};


async function loadCurrencies() {
  const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
  const data = await response.json();
  const currencies = Object.keys(data.conversion_rates);

  currencies.forEach(currency => {
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");

    option1.value = option2.value = currency;
    option1.text = currency;
    option2.text = currency;

    fromCurrency.add(option1);
    toCurrency.add(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
  updateFlag(fromCurrency, fromFlag);
  updateFlag(toCurrency, toFlag);
}


function updateFlag(selectElement, flagElement) {
  const currencyCode = selectElement.value;
  if (currencyFlags[currencyCode]) {
    flagElement.src = `https://flagcdn.com/${currencyFlags[currencyCode]}.svg`;
  } else {
    flagElement.src = "https://flagcdn.com/un.svg"; 
  }
}


async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = amount.value;

  if (amt === "" || isNaN(amt)) {
    resultDiv.innerHTML = "Please enter a valid amount!";
    return;
  }

  const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
  const data = await response.json();
  const rate = data.conversion_rates[to];
  const convertedAmount = (amt * rate).toFixed(2);

  resultDiv.innerHTML = `${amt} ${from} = ${convertedAmount} ${to}`;
}

document.getElementById("convert").addEventListener("click", convertCurrency);


fromCurrency.addEventListener("change", () => updateFlag(fromCurrency, fromFlag));
toCurrency.addEventListener("change", () => updateFlag(toCurrency, toFlag));


swapBtn.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  updateFlag(fromCurrency, fromFlag);
  updateFlag(toCurrency, toFlag);

  convertCurrency();
});

loadCurrencies();
