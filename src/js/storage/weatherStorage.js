const setCityWeather = (city) => {
    localStorage.setItem('city', JSON.stringify(city));
};

const getCityWeather = () => {
    return JSON.parse(localStorage.getItem('city'));
};

export { setCityWeather, getCityWeather };