import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
// import debounce from 'lodash.debounce';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value.trim();

//   console.log(inputValue);

  if(!inputValue){
    clearMarkup()
    return
  }

  fetchCountries(inputValue)
    .then(data => displayMarkup(data))
    .catch(err => onError());
}

function displayMarkup(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    clearMarkup();
    return;
  }
  if(data.length > 2) {
    countryInfo.innerHTML = ''
    createCountryListMarkup(data)
  }else{
    countryList.innerHTML = ''
    createCountryInfoMarkup(data)
  }

}

function onError() {
    clearMarkup()
    Notiflix.Notify.failure('Oops, there is no country with that name')
}

function clearMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

function createCountryListMarkup(arr) {
  const listMarkup = arr
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li class = 'list-country'>
        <img src="${svg}" alt="flag of ${official} " width="60px" height="40px">
        <h2>${official}</h2>
        </li>`
    )
    .join(' ');

  countryList.innerHTML = listMarkup;
  countryList.style.listStyle = 'none';
}

function createCountryInfoMarkup(arr) {
  const countryMarkup = arr
    .map(
      ({
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
      }) => `
    <div class="country">
        <img src="${svg}" alt="flag of ${official}" width='80px' height = '50px'>
        <h1>${official}</h1>
    </div>
    <h2 class="desc">Capital: ${capital}</h2>
    <h3 class="desc">Population: ${population}</h3>
    <h4 class="desc">Languages: ${Object.values(languages)}</h4>`
    )
    .join(' ');

  countryInfo.innerHTML = countryMarkup;
}
