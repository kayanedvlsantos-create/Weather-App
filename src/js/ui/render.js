import { getWeatherIcon } from "../utils/helpers.js";

export function renderWeather(data) {

  const container = document.getElementById("weather");

  const forecastHTML = data.forecast
    .map(
      (day) => `
        <div class="forecast-card">
          <p>${day.formattedDate}</p>

          <h2>${getWeatherIcon(day.code)}</h2>

          <p>${day.min}°C / ${day.max}°C</p>
        </div>
      `
    )
    .join("");

  container.innerHTML = `
  
    <div class="current-weather">

      <h2>${data.city} ${data.state ? "- " + data.state : ""}</h2>

      <h1>${getWeatherIcon(data.weathercode)}</h1>

      <div class="current-temp">
        ${data.temperature}°C
      </div>

      <div class="weather-details">

        <div class="detail-card">
          <p>💨 Vento</p>
          <strong>${data.windspeed} km/h</strong>
        </div>

        <div class="detail-card">
          <p>💧 Umidade</p>
          <strong>${data.humidity}%</strong>
        </div>

        <div class="detail-card">
          <p>🌡️ Sensação</p>
          <strong>${data.apparentTemp}°C</strong>
        </div>

        <div class="detail-card">
          <p>🧭 Direção</p>
          <strong>${data.winddirection}°</strong>
        </div>

      </div>

    </div>

    <h2>📅 Próximos dias</h2>

    <div class="forecast">
      ${forecastHTML}
    </div>

  `;
}

export function renderError(message) {

  const container = document.getElementById("weather");

  container.innerHTML = `
    <p style="color:red; margin-top:20px;">
      ${message}
    </p>
  `;
}