import setTime from "../utils/date";

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
const atmosphericPressure = document.getElementById('pressure');
const humidityStatus = document.getElementById('humidity');
const cloudsStatus = document.getElementById('clouds');
const windSpeed = document.getElementById('windSpeed');
const windDirection = document.getElementById('windDeg');
const windGust = document.getElementById('windGust');
const emptyData = document.getElementById('emptyState');

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
    atmosphericPressure.textContent = `${pressure} hPa`;
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

export { showMessage, removeMessage, showWeatherContent, showEmptyState, 
    validateInput, renderData };