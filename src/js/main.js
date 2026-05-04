import { getWeatherByCity } from "./services/weatherService.js";
import { renderWeather, renderError } from "./ui/render.js";

const cityInput = document.getElementById("cityInput");
const stateInput = document.getElementById("stateInput");
const button = document.getElementById("searchBtn");
const geoBtn = document.getElementById("geoBtn");
const loading = document.getElementById("loading");
const suggestionsBox = document.getElementById("suggestions");

// ================= LOADING =================
function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

// ================= BUSCA =================
button.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  const state = stateInput.value.trim();

  if (!city) {
    renderError("Digite uma cidade.");
    return;
  }

  try {
    showLoading();
    const data = await getWeatherByCity(city, state);
    renderWeather(data);
  } catch (err) {
    renderError(err.message);
  } finally {
    hideLoading();
  }
});

// ================= GEOLOCALIZAÇÃO =================
geoBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    renderError("Geolocalização não suportada.");
    return;
  }

  showLoading();

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

        const res = await fetch(url);
        const weather = await res.json();

        const data = {
          city: "Sua localização",
          state: "",
          temperature: weather.current_weather.temperature,
          windspeed: weather.current_weather.windspeed,
          weathercode: weather.current_weather.weathercode,
          forecast: weather.daily.time.map((date, i) => ({
            formattedDate: new Date(date).toLocaleDateString("pt-BR", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
            }),
            min: weather.daily.temperature_2m_min[i],
            max: weather.daily.temperature_2m_max[i],
            code: weather.daily.weathercode[i],
          })),
        };

        renderWeather(data);
      } catch (err) {
        renderError("Erro ao obter clima da localização.");
      } finally {
        hideLoading();
      }
    },
    () => {
      hideLoading();
      renderError("Permissão de localização negada.");
    }
  );
});

// ================= AUTOCOMPLETE =================
cityInput.addEventListener("input", async () => {
  const value = cityInput.value.trim();

  if (value.length < 3) {
    suggestionsBox.innerHTML = "";
    return;
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(value)}&count=5&language=pt&format=json`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.results) {
      suggestionsBox.innerHTML = "<div class='suggestion-item'>Nenhuma cidade</div>";
      return;
    }

    suggestionsBox.innerHTML = data.results
      .map(
        (c) => `
        <div class="suggestion-item" data-city="${c.name}" data-state="${c.admin1 || ""}">
          ${c.name} ${c.admin1 ? "- " + c.admin1 : ""}
        </div>
      `
      )
      .join("");

  } catch (err) {
    suggestionsBox.innerHTML = "<div class='suggestion-item'>Erro</div>";
  }
});

// clique nas sugestões
suggestionsBox.addEventListener("click", (e) => {
  const item = e.target.closest(".suggestion-item");
  if (!item) return;

  cityInput.value = item.dataset.city;
  stateInput.value = item.dataset.state;
  suggestionsBox.innerHTML = "";
});