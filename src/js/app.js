import getWeather from "./api/weather";
import { getCityWeather } from "./storage/weatherStorage";
import { renderData, showEmptyState, showWeatherContent, validateInput } from "./ui/weather";
import './icons';

const searchBar = document.getElementById('searchCountry');
const cityWeather = getCityWeather();

if (!cityWeather) {
    showEmptyState();
} else {
    showWeatherContent();
    renderData(cityWeather);
}

searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const city = searchBar.value.trim();
        if (!validateInput(searchBar, city)) return;
        getWeather(city);
        searchBar.value = '';
    }
});