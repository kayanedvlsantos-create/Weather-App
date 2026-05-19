import {
  fetchCoordinates,
  fetchWeather,
} from "../api/weatherApi.js";

import {
  formatWeatherData,
  formatForecast,
  getStateFullName,
} from "../utils/helpers.js";

import {
  setCache,
  getCache,
} from "../utils/cache.js";

export async function getWeatherByCity(city, state) {

  const cacheKey = `${city}-${state}`;

  // ================= CACHE =================

  const cached = getCache(cacheKey);

  if (cached) {
    return cached;
  }

  // ================= QUERY =================

  const stateFull = getStateFullName(state);

  const query = stateFull
    ? `${city}, ${stateFull}, Brasil`
    : `${city}, Brasil`;

  // ================= LOCALIZAÇÃO =================

  const location = await fetchCoordinates(query);

  // ================= CLIMA =================

  const weather = await fetchWeather(
    location.latitude,
    location.longitude
  );

  // ================= RESULTADO =================

  const result = {
    ...formatWeatherData(location, weather),

    forecast: formatForecast(weather),
  };

  // ================= SALVAR CACHE =================

  setCache(cacheKey, result);

  return result;
}