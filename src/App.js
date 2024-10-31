import { useState } from 'react';
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
        <div className='not-found'>
            <img
                src={LocationError}
                alt='Location not found'
            />
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

    const handleClick = async () => {
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
            className={`container container${
                isError || weatherData?.id ? '-open' : ''
            }`}
        >
            <div className='search-box'>
                <i className='fa-solid fa-location-dot'></i>
                <input
                    type='text'
                    placeholder='Enter your location'
                    value={location}
                    onChange={handleChangeLocation}
                />
                <button
                    className='fa-solid fa-magnifying-glass'
                    onClick={handleClick}
                    disabled={location.length < 3}
                ></button>
            </div>

            {isError && <LocationNotFound />}

            {!isError && weatherData?.id && (
                <>
                    <div className='weather-box'>
                        <img
                            src={weatherPicture}
                            alt='Weather Box'
                        />
                        <p className='temperature'>
                            {Math.round(weatherData.main.temp)}
                            <span>°C</span>
                        </p>
                        <p className='description'>
                            {weatherData.weather[0].description}
                        </p>
                    </div>

                    <div className='weather-details'>
                        <div className='humidity'>
                            <i className='fa-solid fa-water'></i>
                            <div className='text'>
                                <span>{weatherData.main.humidity}%</span>
                                <p>Humidity</p>
                            </div>
                        </div>

                        <div className='wind'>
                            <i className='fa-solid fa-wind'></i>
                            <div className='text'>
                                <span>
                                    {Math.round(weatherData.wind.speed)} Km/h
                                </span>
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
