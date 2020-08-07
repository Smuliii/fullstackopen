import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ weather }) => (
  <div>
    <h2>Weather in {weather.city}</h2>
    <p>Temperature: {weather.temp} C</p>
    <p>Wind: {weather.wind} m/s</p>
  </div>
)

const Country = ({ country, weather }) => (
  <div>
    <h1>{country.name}</h1>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <p>Languages:</p>
    <ul>
      {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
    </ul>
    <p><img src={country.flag} height="100" alt="" /></p>
    {weather && <Weather weather={weather} />}
  </div>
)

const Countries = ({ countries, handleClick }) => (
  <ul>
    {countries.map(country => (
      <li key={country.name}>
        {country.name}
        <button data-country={country.name} onClick={handleClick}>Show</button>
      </li>
    ))}
  </ul>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [results, setResults] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    fetchCountryData()
  }, [])

  const fetchCountryData = () => {
    axios.get('//restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }

  const fetchWeatherData = city => {
    if (city === weather?.city) {
      return
    }
    // No API = it's sunny all day everyday
    setWeather({
      city: city,
      temp: 25,
      wind: 1.2,
    })
  }

  const filterCountries = name => (
    setResults(countries.filter(country => new RegExp(name, 'i').test(country.name)))
  )

  const handleFilterChange = e => {
    setFilter(e.target.value)
    filterCountries(e.target.value)
  }

  const handleCountryClick = e => {
    filterCountries(e.target.dataset.country)
  }

  const showResults = () => {
    const limit = 10

    if (results.length === 1) {
      const country = results[0]
      fetchWeatherData(country.capital)
      return <Country country={country} weather={weather} />
    }

    if (results.length > 1 && results.length <= limit) {
      return <Countries countries={results} handleClick={handleCountryClick} />
    }

    if (filter) {
      return <p>Too many matches, specify another filter!</p>
    }
  }

  return (
    <div>
      Find countries: <input value={filter} onChange={handleFilterChange} />
      {showResults()}
    </div>
  )
}

export default App
