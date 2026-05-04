import { fetchCoordinates, fetchWeather } from "../api/weatherApi.js";
import {
  formatWeatherData,
  formatForecast,
  getStateFullName,
} from "../utils/helpers.js";

export async function getWeatherByCity(city, state) {
  const stateFull = getStateFullName(state);

  const query = stateFull
    ? `${city}, ${stateFull}, Brasil`
    : `${city}, Brasil`;

  const location = await fetchCoordinates(query);

  const weather = await fetchWeather(
    location.latitude,
    location.longitude
  );

  return {
    ...formatWeatherData(location, weather),
    forecast: formatForecast(weather),
  };
}