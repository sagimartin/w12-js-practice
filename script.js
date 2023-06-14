const filterComponent = () => `
  <span>minimum population:</span>
  <input type="number">
  <button class="filter">filter</button>
`

const sortComponent = () => `
  <button class="sort">sort</button>
`

const sortCountries = (countriesArr) => countriesArr.sort((a, b) => a.pop - b.pop) /* növekvő sorrend */
    /* return b.pop - a.pop // csökkenő sorrend */
    /* return a.name.localeCompare(b.name) // ABC szerinti sorbarendezés */
    /* return b.name.localeCompare(a.name) // ABC szerinti visszafelé sorbarendezés */

const filterCountries = (countriesArr, minPop) => countriesArr.filter(country => country.pop > minPop)

const countryComponent = ({ name, pop, area, lang }) => {
  // const { name, pop, area, lang } = country // !! OBJECT DESTRUCTURING !!
  
  /* 
    const name = country.name
    const pop = country.pop
    const area = country.area
    const lang = country.lang
  */

  return `
    <div class="country">
      <h2>${name}</h2>
      <h3>pop: ${pop}</h3>
      <h4>area: ${area}</h4>
      <h5>lang: ${lang.join(', ')}</h5>
    </div>
  `
}

const init = async () => {
  const rootElement = document.querySelector('#root')
  rootElement.insertAdjacentHTML('beforebegin', sortComponent())
  rootElement.insertAdjacentHTML('beforebegin', filterComponent())

  const sortButtonElement = document.querySelector('button.sort')
  sortButtonElement.addEventListener('click', () => {
    const sortedCountries = sortCountries(countries)
    console.log(sortedCountries) // TO DO: dom manipulation
  })

  const filterButtonElement = document.querySelector('button.filter')
  filterButtonElement.addEventListener('click', () => {
    const filteredCountries = filterCountries(countries, document.querySelector('input').value)
    rootElement.innerHTML = ""
    filteredCountries.forEach(country => {
      rootElement.insertAdjacentHTML('beforeend', countryComponent(country))
    });
  })

  const countriesData = await fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())

  const countries = countriesData.map(countryData => {
    return {
      name: countryData.name.common,
      pop: countryData.population,
      area: countryData.area,
      lang: countryData.languages ? Object.keys(countryData.languages).map(lang => countryData.languages[lang]) : []
    }
  }) //leszűkített adathalmaz a countriesData-ból


  countries.forEach(country => {
    rootElement.insertAdjacentHTML('beforeend', countryComponent(country))
  });
}

init()

/* const arr = ['kutya', 'cica', 'mérési hiba', 'lorem', 'ipsum', 'dolor', 'et'] // array destructuring

const [a, b, c, ...rest] = arr

console.log(rest) */