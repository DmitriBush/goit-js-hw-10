import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function onSearch(evt) {
  const name = evt.target.value.trim();
  if (name === '') {
    clearData();
    return;
  }

  fetchCountries(name)
    .then(showCountries)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function showCountries(countries) {
  if (countries.length === 1) {
    renderCountryInfo(countries);
  } else if (countries.length >= 2 && countries.length <= 10) {
    renderCountryList(countries);
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function renderCountryList(countries) {
  countryInfo.innerHTML = '';

  const markupList = countries
    .map(country => {
      return `<li>
            <img src="${country.flags.svg}" widht = 50 height = 30 ></img>
            <span>${country.name.official}</span>
        </li>`;
    })
    .join('');

  countryList.innerHTML = markupList;
}

function renderCountryInfo(countries) {
  countryList.innerHTML = '';

  const murkupInfo = countries
    .map(country => {
      return `<img src="${country.flags.svg}" widht = 50 height = 30 ></img>
            <h2>${country.name.official}</h2>
            <ul>
                <li><span>Capital:</span> ${country.capital}</li>
                <li><span>Population:</span> ${country.population}</li>
                <li><span>Languages:</span> ${Object.values(
                  country.languages
                ).join(', ')}</li>
            </ul>`;
    })
    .join('');

  countryInfo.innerHTML = murkupInfo;
}
input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
