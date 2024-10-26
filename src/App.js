import LocationError from './assets/404.png';
import Clear from './assets/clear.png';
import Cloud from './assets/cloud.png';
import Mist from './assets/mist.png';
import Rain from './assets/rain.png';
import Snow from './assets/snow.png';
import weatherAPI from './utils/api';

import './App.css';
import { useState } from 'react';

const LocationNotFound = () => {
    return (
        <div className='not-found'>
            <img src={LocationError} alt='Location not found' />
            <p>Oops! Invalid location :/</p>
        </div>
    );
};

function App() {
    const [location, setLocation] = useState('');

    const handleChangeLocation = (event) => {
        setLocation(event.target.value);
    };

    const handleClick = async () => {
        console.log(location);
        const response = await weatherAPI(location);
        console.log(response.json());
    };

    return (
        <div className='container'>
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
                    // disabled={location.length > 2}
                ></button>
            </div>

            <LocationNotFound />

            <div className='weather-box'>
                <img src='' alt='Weather Box' />
                <p className='temperature'></p>
                <p className='description'></p>
            </div>

            <div className='weather-details'>
                <div className='humidity'>
                    <i className='fa-solid fa-water'></i>
                    <div className='text'>
                        <span></span>
                        <p>Humidity</p>
                    </div>
                </div>

                <div className='wind'>
                    <i className='fa-solid fa-wind'></i>
                    <div className='text'>
                        <span></span>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
