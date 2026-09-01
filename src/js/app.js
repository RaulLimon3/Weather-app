import './icons';

// Establecemos conexion con nuestro endpoint
const API_KEY = '1d4aa0fdcc1142204c29eebe5fcff161';

// Acceder a nuestros elementos
const weatherContent = document.getElementById('weatherContent');
const searchBar = document.getElementById('searchCountry');
const messageError = document.getElementById('messageError');
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
const emptyData = document.getElementById('emptyState');

// Buscamos los el clima del pais
searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const city = searchBar.value.trim();
        if (!validateInput(city)) return;
        removeMessage();
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
            handleHttpError(response.status);
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        handleWeather(data);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

const handleHttpError = (status) => {
    switch (status) {
        case 404:
            showMessage('No encontramos esa ciudad. Verifica el nombre');
            break;
        case 401:
            showMessage('No se puedo validar la información, intentelo de nuevo por favor');
            break;
        case 429:
            showMessage('Haz hecho muchas solicitudes, intentelo más tarde por favor');
            break;
        case 500:
            showMessage('El servidor esta teniendo problemas, intentalo mas tarde por favor');
            break;
        default:
            showMessage('Ha ocurrido un error. Intentalo nuevamente');
    }
};

const setCityWeather = (city) => {
    localStorage.setItem('city', JSON.stringify(city));
};

const getCityWeather = () => {
    return JSON.parse(localStorage.getItem('city'));
};

const handleWeather = ({ name, weather, main, sys, visibility, clouds, wind }) => {
    const cityData = {
        name,
        weather: weather[0],
        main,
        sys,
        visibility,
        clouds,
        wind
    };
    renderData(cityData);
    setCityWeather(cityData);
    showWeatherContent();
};

const validateInput = (value) => {
    if (!value) {
        searchBar.classList.add('searchbar-input--error');
        showMessage('Por favor busca una ciudad');
        return false;
    }
    if (value.length < 2 || value.length > 50) {
        searchBar.classList.add('searchbar-input--error');
        showMessage('Esta ciudad no es valida, ingrese otra ciudad por favor');
        return false;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]+$/.test(value)) {
        searchBar.classList.add('searchbar-input--error');
        showMessage('El formato no es valido, ingrese una ciudad por favor');
        return false;
    }
    return true;
};

const setWeather = ({ main, description, icon }) => {
    cityStatus.textContent = main;
    cityStatusDescription.textContent = description;
    descriptionIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    descriptionIcon.alt = `${description}`;
};

const setWeatherStatistics = ({ temp, feels_like, temp_min, temp_max, pressure, humidity }) => {
    cityTemperature.textContent = `${temp}°`;
    feelsLikeTemperature.textContent = `${feels_like}°`;
    maxTemperature.textContent = `${temp_max}°`;
    minTemperature.textContent = `${temp_min}°`;
    atomosphericPressure.textContent = `${pressure} hPa`;
    humidityStatus.textContent = `${humidity}%`;
};

const setWind = ({ speed, deg, gust }) => {
    windSpeed.textContent = `${speed} m/s`;
    windDirection.textContent = `${deg}°`;
    windGust.textContent = `${gust} m/s`;
};

const setSunTimes = ({ sunrise, sunset }) => {
    sunRiseTime.textContent = setTime(sunrise);
    sunSetTime.textContent = setTime(sunset);
};

const renderData = ({ name, weather, main, sys, visibility, clouds, wind }) => {
    cityName.textContent = name;
    setWeather(weather);
    setWeatherStatistics(main);
    setSunTimes(sys);
    visibilityStatus.textContent = `${visibility / 1000} km`;
    cloudsStatus.textContent = `${clouds.all}%`;
    setWind(wind);
};

const showMessage = (message) => {
    messageError.classList.remove('navbar-message--hidden');
    messageError.textContent = message;
};

const removeMessage = () => {
    messageError.classList.add('navbar-message--hidden');
    messageError.textContent = '';
};

const showWeatherContent = () => {
    weatherContent.classList.remove('layout--hidden');
    emptyData.classList.add('empty-state--hidden');
};

const showEmptyState = () => {
    weatherContent.classList.add('layout--hidden');
    emptyData.classList.remove('empty-state--hidden');
};

const setTime = (unixValue) => {
    const unixTimesStamp = (unixValue);
    const date = new Date(unixTimesStamp * 1000);
    return dateFormat(date);
};

const dateFormat = (date) => {
    return date.toLocaleTimeString('es-MX', { hour12: true, hour: 'numeric', minute: '2-digit' });
};

const cityWeather = getCityWeather();
if (!cityWeather) {
    showEmptyState();
} else {
    showWeatherContent();
    renderData(cityWeather);
}