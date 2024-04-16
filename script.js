// Fetch exchange rates from an API
function fetchExchangeRates() {
    // Replace YOUR_API_KEY with your actual API key
    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.rates;
            const currencies = Object.keys(rates);

            // Add currency options to source and target dropdown menus
            const sourceCurrencySelect = document.getElementById("source");
            const targetCurrencySelect = document.getElementById("target");

            currencies.forEach(currency => {
                const option = document.createElement("option");
                option.text = currency;
                sourceCurrencySelect.add(option);

                const option2 = document.createElement("option");
                option2.text = currency;
                targetCurrencySelect.add(option2);
            });
        })
        .catch(error => console.log("Error fetching exchange rates:", error));
}

// Perform currency conversion
function convertCurrency() {
    const amountInput = document.getElementById("amount");
    const sourceCurrencySelect = document.getElementById("source");
    const targetCurrencySelect = document.getElementById("target");
    const resultDiv = document.getElementById("result");

    const amount = amountInput.value;
    const sourceCurrency = sourceCurrencySelect.value;
    const targetCurrency = targetCurrencySelect.value;

    // Make sure all fields are filled
    if (amount && sourceCurrency && targetCurrency) {
        // Fetch the conversion rate from an API
        const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const rates = data.rates;
                const sourceRate = rates[sourceCurrency];
                const targetRate = rates[targetCurrency];

                // Perform the conversion
                const convertedAmount = (amount / sourceRate) * targetRate;
                resultDiv.textContent = `${amount} ${sourceCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}`;
            })
            .catch(error => console.log("Error fetching exchange rates:", error));
    } else {
        resultDiv.textContent = "Please fill in all fields.";
    }
}

// Fetch exchange rates on page load
fetchExchangeRates();

