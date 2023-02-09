import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio'

const DEBOUNCE_DELAY = 500;
const START_URL = "https://restcountries.com/v2/name/";
const inputEl = document.getElementById("search-box");
const listEl = document.querySelector("ul");
const containerEl = document.querySelector(".country-info");
const MAX_COUNTRIES = 10;
let input = "";

inputEl.addEventListener("input", debounce((e) => {
    input = e.target.value.trim(" ");
    listEl.innerHTML = '';
    containerEl.innerHTML = "";
    if (!input) {
        return;
    }
    fetchCountries(START_URL, input).then(data => {
        if (data.length > MAX_COUNTRIES) {
            return Notify.info("Too many matches found. Please enter a more specific name.");
        }
        else if (data.length > 1) {
            listEl.insertAdjacentHTML("beforeend", markupCountries(data))
        }
        else if (data.length === 1) {
            containerEl.insertAdjacentHTML("beforeend", markupCountrie(data))
        }
    }).catch();
}, DEBOUNCE_DELAY));

function markupCountries(items) {
    return items.map(item => `<li><img src="${item.flag}" alt="flag" width="40" height ="30">
            <p>  ${item.name}</p></li>`).join("");
}
function markupCountrie(item) {
    return item.map(country => `<div class ="wraper">
    <img src="${country.flag}" alt="flag" width="70" height ="40">
            <h2>  ${country.name}</h2></div><p><b>Capital: </b>${country.capital}</p>
            <p><b>Population: </b>${country.population}</p>
            <p><b>Languages: </b>${country.languages.map(lang => lang.name).join(", ")}</p>`).join("");
}
