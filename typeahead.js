const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(response => response.json())
  .then(cityData => cities.push(...cityData));

const input = document.querySelector('input');
const resultsList = document.querySelector('.results');

function filterMatches(userInput) {
  userInput = userInput.toLowerCase();
  return cities.filter(cityObject => {
    const cityName = cityObject.city.toLowerCase();
    const stateName = cityObject.state.toLowerCase();
    return cityName.includes(userInput) || stateName.includes(userInput);
  });
}

function displayResults() {
  const matches = filterMatches(this.value);
  let html = matches.map((resultObject, index) => {
    const population = resultObject.population;
    const regex = new RegExp(this.value, 'gi');
    const city = resultObject.city.replace(
      regex, `<span class='hl'>${this.value}</span>`);
    const state = resultObject.state.replace(
      regex, `<span class='hl'>${this.value}</span>`);

    return `
      <li class='result'>
        <span class='name'>${city}, ${state}</span>
        <span class='population'>${population}</span>
      </li>
    `
  }).join('');

  if (!html) {
    html = `<li class='result'><em>No results found</em></li>`;
  }

  if (!this.value) {
    html = '';
  }

  resultsList.innerHTML = html;
}

input.addEventListener('change', displayResults);
input.addEventListener('keyup', displayResults);
