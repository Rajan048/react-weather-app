import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const API_KEY = "your api key";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const getWeatherInfo = async (city) => {
    try {
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      let jsonResponse = await response.json();

      if (jsonResponse.cod !== 200) {
        throw new Error(jsonResponse.message);
      }

      let result = {
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
        icon: jsonResponse.weather[0].icon,
        city: jsonResponse.name,
        country: jsonResponse.sys.country
      };

      return result;
    } catch (err) {
      throw err;
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
    setError(false); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!city.trim()) return;

    try {
      const newInfo = await getWeatherInfo(city);
      if (newInfo) {
        updateInfo(newInfo);
        setError(false); 
        setCity("");
      }
    } catch (err) {
      setError(true); 
    }
  };

  return (
    <div className="SearchBox">
      <h3>Search for the Weather</h3>

      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /><br />
        <Button
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
        >
          Send
        </Button>

        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>
             Could not fetch weather data. Please check the city name and try again.
          </p>
        )}
      </form>

      <br />
    </div>
  );
}
