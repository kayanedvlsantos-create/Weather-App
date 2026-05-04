import { getWeatherIcon } from "../utils/helpers.js";

export function renderWeather(data) {
  const container = document.getElementById("weather");

  const forecastHTML = data.forecast
    .map(
      (day) => `
      <div>
        <p>${day.formattedDate}</p>
        <p>${getWeatherIcon(day.code)}</p>
        <p>${day.min}°C / ${day.max}°C</p>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
    <h2>${data.city} - ${data.state}</h2>
    <p>${getWeatherIcon(data.weathercode)}</p>
    <p>🌡️ ${data.temperature}°C</p>
    <p>💨 ${data.windspeed} km/h</p>

    <h3>Próximos dias</h3>
    <div class="forecast">${forecastHTML}</div>
  `;
}

export function renderError(message) {
  const container = document.getElementById("weather");
  container.innerHTML = `<p style="color:red;">${message}</p>`;
}