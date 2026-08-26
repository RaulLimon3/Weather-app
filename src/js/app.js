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
        cityName.textContent = data.name;
        cityTemperature.textContent = `${data.main.temp}°`;
        data.weather.forEach(data => {
            cityStatus.textContent = data.main;
            cityStatusDescription.textContent = data.description;
            descriptionIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`
            descriptionIcon.alt = `${data.description}`;
        });
        sunRiseTime.textContent = setTime(data.sys.sunrise);
        sunSetTime.textContent = setTime(data.sys.sunset);
        visibilityStatus.textContent = `${data.visibility / 1000} km`;
        feelsLikeTemperature.textContent = `${data.main.feels_like}°`;
        maxTemperature.textContent = `${data.main.temp_max}°`;
        minTemperature.textContent = `${data.main.temp_min}°`;
        atomosphericPressure.textContent = `${data.main.pressure} hPa`;
        humidityStatus.textContent = `${data.main.humidity}%`;
        cloudsStatus.textContent = `${data.clouds.all}%`
        windSpeed.textContent = `${data.wind.speed} m/s`;
        windDirection.textContent = `${data.wind.deg}°`;
        windGust.textContent = `${data.wind.gust} m/s`;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

const setTime = (unixValue) => {
    const unixTimesStamp = (unixValue);
    const date = new Date(unixTimesStamp * 1000);
    return dateFormat(date);
};

const dateFormat = (date) => {
    return date.toLocaleTimeString('es-MX', { hour12: true, hour: 'numeric', minute: '2-digit' });
}; 