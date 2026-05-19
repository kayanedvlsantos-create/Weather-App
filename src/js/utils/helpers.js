// 🌦️ Ícones
export function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "☁️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  return "🌡️";
}

// 📅 Formatar data
export function formatDate(dateStr) {
  const date = new Date(dateStr);

  return date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}

// 📍 Estados do Brasil
const statesBR = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

// 🔁 Converter sigla → nome completo
export function getStateFullName(state) {
  return statesBR[state?.toUpperCase()] || state;
}

// 🌡️ Clima atual
export function formatWeatherData(location, weather) {
  return {
    city: location.name,
    state: location.admin1 || "",
    country: location.country,
    temperature: weather.current_weather.temperature,
    windspeed: weather.current_weather.windspeed,
    weathercode: weather.current_weather.weathercode,
    humidity: weather.hourly.relative_humidity_2m[0],
    apparentTemp: weather.hourly.apparent_temperature[0],
    time: weather.current_weather.time,
    winddirection: weather.current_weather.winddirection,
  };
}

// 📅 Previsão
export function formatForecast(weather) {
  return weather.daily.time.map((date, i) => ({
    date,
    formattedDate: formatDate(date),
    max: weather.daily.temperature_2m_max[i],
    min: weather.daily.temperature_2m_min[i],
    code: weather.daily.weathercode[i],
  }));
}