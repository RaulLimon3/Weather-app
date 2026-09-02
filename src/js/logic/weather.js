import { setCityWeather } from "../storage/weatherStorage";
import { renderData, showWeatherContent } from "../ui/weather";

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

export default handleWeather;