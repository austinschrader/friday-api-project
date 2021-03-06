import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './js/currency-service.js';

async function makeApiCall(currencyAmount, currencyTo) {
  const response = await CurrencyService.getConversion();
  getElements(response, currencyAmount, currencyTo);
}

function getElements(response, currencyAmount, currencyTo) {
  if (response.conversion_rates) {
    let currentRate = eval(`response.conversion_rates.${currencyTo}`);
    if (currentRate) {
      console.log(currentRate)
      let resultAmount = currentRate * currencyAmount
      $('#results').empty().append(`This is how much you would have in ${currencyTo}: ${resultAmount}.`)
    } else {
      $('#results').empty().text(`The currency selected does not exist.`)
    }
  } else {
    $('#results').empty().text(`The API call has experienced an error, because here's the response result we got: ${response.result}.`)
  }
}

$(document).ready(function () {
  $('#formOne').submit(function (event) {
    event.preventDefault();
    let currencyAmount = $('#currency-amount').val();
    let currencyTo = $('select option:selected').val();
    makeApiCall(currencyAmount, currencyTo)
  });
});
