import axios from 'axios'
import { useEffect, useState } from 'react'

const weatherDescription = (code) => {
  if (code === 0) return { icon: '☀️', text: 'Clear sky' }
  if (code <= 3) return { icon: '⛅', text: 'Partly cloudy' }
  if (code <= 48) return { icon: '🌫️', text: 'Fog' }
  if (code <= 67) return { icon: '🌧️', text: 'Rain' }
  if (code <= 77) return { icon: '🌨️', text: 'Snow' }
  if (code <= 82) return { icon: '🌦️', text: 'Rain showers' }
  if (code <= 86) return { icon: '🌨️', text: 'Snow showers' }
  return { icon: '⛈️', text: 'Thunderstorm' }
}

const Weather = ({ capital, coordinates }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [latitude, longitude] = coordinates

  useEffect(() => {
    setWeather(null)
    setError(null)

    axios
      .get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude,
          longitude,
          current: 'temperature_2m,weather_code,wind_speed_10m',
        },
      })
      .then((response) => setWeather(response.data))
      .catch(() => setError('Weather information is currently unavailable'))
  }, [latitude, longitude])

  if (error) return <p>{error}</p>
  if (!weather) return <p>Loading weather...</p>

  const conditions = weatherDescription(weather.current.weather_code)

  return (
    <section>
      <h2>Weather in {capital}</h2>
      <div className="weather-icon" aria-label={conditions.text}>
        {conditions.icon}
      </div>
      <p>{conditions.text}</p>
      <p>
        temperature {weather.current.temperature_2m}{' '}
        {weather.current_units.temperature_2m}
      </p>
      <p>
        wind {weather.current.wind_speed_10m}{' '}
        {weather.current_units.wind_speed_10m}
      </p>
    </section>
  )
}

const Country = ({ country }) => {
  const capital = country.capital?.[0] ?? 'No capital'
  const languages = Object.values(country.languages ?? {})
  const coordinates = country.capitalInfo?.latlng ?? country.latlng

  return (
    <article>
      <h1>{country.name.common}</h1>
      <p>capital {capital}</p>
      <p>area {country.area}</p>

      <h2>languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        className="flag"
        src={country.flags.svg}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
      />

      {coordinates?.length === 2 && capital !== 'No capital' && (
        <Weather capital={capital} coordinates={coordinates} />
      )}
    </article>
  )
}

const Results = ({ countries, query, onShow }) => {
  if (!query.trim()) return <p>Start typing a country name</p>

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 0) return <p>No matching countries</p>

  if (countries.length === 1) return <Country country={countries[0]} />

  return (
    <div>
      {countries.map((country) => (
        <p key={country.cca3}>
          {country.name.common}{' '}
          <button onClick={() => onShow(country.name.common)}>show</button>
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data))
      .catch(() => setError('Could not load country information'))
  }, [])

  const matchingCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <main>
      <label>
        find countries{' '}
        <input value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>

      {error ? (
        <p className="error">{error}</p>
      ) : (
        <Results
          countries={matchingCountries}
          query={query}
          onShow={setQuery}
        />
      )}
    </main>
  )
}

export default App

