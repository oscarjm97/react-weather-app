const API_KEY = '1265140e7dc5046b767bdafd08bcccdd';

async function weatherAPI(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json());
}

export default weatherAPI;
