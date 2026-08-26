import './icons';

// Establecemos conexion con nuestro endpoint
const API_KEY = '1d4aa0fdcc1142204c29eebe5fcff161';

// Acceder a nuestros elementos
const searchBar = document.getElementById('searchCountry');
const cityName = document.getElementById('locationName');
const cityTemperature = document.getElementById('locationTemperature');
const cityStatus = document.getElementById('locationStatus');
const cityStatusDescription = document.getElementById('locationDescription');
const descriptionIcon = document.getElementById('iconCondition');
const sunRiseTime = document.getElementById('sunrise');
const sunSetTime = document.getElementById('sunset');
const visibilityStatus = document.getElementById('visibility');
const feelsLikeTemperature = document.getElementById('feelsLike');
const maxTemperature = document.getElementById('tempMax');
const minTemperature = document.getElementById('tempMin');
const atomosphericPressure = document.getElementById('pressure');
const humidityStatus = document.getElementById('humidity');
const cloudsStatus = document.getElementById('clouds');
const windSpeed = document.getElementById('windSpeed');
const windDirection = document.getElementById('windDeg');
const windGust = document.getElementById('windGust');

// Buscamos los el clima del pais
searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const city = searchBar.value.trim();
        const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
        getWeather(WEATHER_API);
        searchBar.value = '';
    }
});

// Obtenemos los datos del clima
const getWeather = async (api) => {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};