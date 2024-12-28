import { useState } from 'react';
import {
  IconMapPinFilled,
  IconRipple,
  IconSearch,
  IconWind,
} from '@tabler/icons-react';
import weatherAPI from './utils/api';
import './App.css';

import LocationError from './assets/404.png';
import Clear from './assets/clear.png';
import Clouds from './assets/clouds.png';
import Drizzle from './assets/drizzle.png';
import Fog from './assets/fog.png';
import Rain from './assets/rain.png';
import Snow from './assets/snow.png';
import Thunderstorm from './assets/thunderstorm.png';

const LocationNotFound = () => {
  return (
    <div className="not-found">
      <img src={LocationError} alt="Location not found" />
      <p>Oops! Invalid location :/</p>
    </div>
  );
};

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [weatherPicture, setWeatherPicture] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter' && location.length >= 3) {
      getWeatherAPI();
    }
  };

  const getWeatherAPI = async () => {
    const response = await weatherAPI(location);

    if (response.cod !== 200) {
      setIsError(true);
      return;
    }

    setIsError(false);
    setWeatherData(response);

    switch (response.weather[0].main) {
      case 'Clear':
        setWeatherPicture(Clear);
        break;

      case 'Clouds':
        setWeatherPicture(Clouds);
        break;

      case 'Drizzle':
        setWeatherPicture(Drizzle);
        break;

      case 'Fog':
        setWeatherPicture(Fog);
        break;

      case 'Rain':
        setWeatherPicture(Rain);
        break;

      case 'Snow':
        setWeatherPicture(Snow);
        break;

      case 'Thunderstorm':
        setWeatherPicture(Thunderstorm);
        break;

      default:
        setWeatherPicture('');
    }
  };

  return (
    <div
      className={`container ${
        isError || weatherData?.id ? 'container-open' : ''
      }`}
    >
      <div className="search-box">
        <IconMapPinFilled className="icon" height={32} width={32} />
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={handleChangeLocation}
          onKeyDown={handleEnterKeyPress}
        />
        <button disabled={location.length < 3} onClick={getWeatherAPI}>
          <IconSearch stroke={2} height={28} width={28} />
        </button>
      </div>

      {isError && <LocationNotFound />}

      {!isError && weatherData?.id && (
        <>
          <div className="weather-box">
            <img src={weatherPicture} alt="Weather Box" />
            <p className="temperature">
              {Math.round(weatherData.main.temp)}
              <span>°C</span>
            </p>
            <p className="description">{weatherData.weather[0].description}</p>
          </div>

          <div className="weather-details">
            <div className="humidity">
              <IconRipple className="icon" stroke={2} height={32} width={32} />
              <div className="text">
                <span>{weatherData.main.humidity}%</span>
                <p>Humidity</p>
              </div>
            </div>

            <div className="wind">
              <IconWind className="icon" stroke={2} height={32} width={32} />
              <div className="text">
                <span>{Math.round(weatherData.wind.speed)} Km/h</span>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
