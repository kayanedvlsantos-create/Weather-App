export async function fetchCoordinates(query) {
  const baseUrl = "https://geocoding-api.open-meteo.com/v1/search";

  // várias tentativas de busca
  const queries = [
    `${query}`,                          // completo
    query.replace(", Brasil", ""),       // sem Brasil
    query.split(",")[0],                 // só cidade
  ];

  for (let q of queries) {
    const url = `${baseUrl}?name=${encodeURIComponent(
      q
    )}&count=1&language=pt&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0];
    }
  }

  throw new Error("Cidade não encontrada.");
}

export async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

  const response = await fetch(url);
  return response.json();
}