const currencyEl_one = document.getElementById('currency_one');
const amountEl_one = document.getElementById('amount_one');
const currencyEl_two = document.getElementById('currency_two');
const amountEl_two = document.getElementById('amount_two');
const swapBtn = document.querySelector('.swap button');
const rateEl = document.querySelector('#rate h3');

function exchange() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    let small = document.createElement('small');

     fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            let info = {
                date: data.date,
                rates: data.rates
            }
            let rate = info.rates[currency_two]
            console.log(rate);
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
            // rateEl.innerText = `1 ${currency_one} = ${info.rates[currency_two]} ${currency_two}`;
            // small.innerText = ` ${info.date}`;
            // rateEl.appendChild(small);

            // amountEl_one.addEventListener('input', () => {
            //     amountEl_two.value = `${amountEl_one.value} * ${info.rates[currency_two]}`;
            //     exchange();
            // })
        }
        )
}

currencyEl_one.addEventListener('change', () => {
    exchange();
})
currencyEl_two.addEventListener('change', () => {
    exchange();
})
amountEl_one.addEventListener('input', () => {
    exchange();
})
amountEl_two.addEventListener('input', () => {
    exchange();
})

swapBtn.addEventListener('click',() =>{
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    exchange();
})

exchange();