import handleWeather from "../logic/weather";
import { showMessage } from "../ui/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeather = async (city) => {
    const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;
    try {
        const response = await fetch(WEATHER_API);
        if (!response.ok) {
            handleHttpError(response.status);
        }
        const data = await response.json();
        handleWeather(data);
    } catch (error) {
        console.log(`Error: ${error}`);
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

export default getWeather;