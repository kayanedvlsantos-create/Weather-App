# 🌤️ Weather App

Aplicação web de previsão do tempo desenvolvida com JavaScript puro consumindo a API Open-Meteo.

O projeto permite buscar clima por cidade e estado, utilizar geolocalização, visualizar previsão dos próximos dias e acessar uma interface moderna, responsiva e com dark mode.

---

## 🚀 Funcionalidades

- 🔍 Busca por cidade + estado
- 📍 Geolocalização automática
- 🌦️ Clima atual em tempo real
- 📅 Previsão para próximos dias
- ⚡ Autocomplete com debounce
- 🌙 Dark mode
- 📱 Layout responsivo
- 💾 Cache inteligente com expiração
- 🎨 Interface moderna e amigável

---

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript (ES Modules)
- Open-Meteo API
- Geocoding API

---

## 📂 Estrutura do Projeto

```bash
weather-app/
│
├── src/
│   ├── api/
│   │   └── weatherApi.js
│   │
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   ├── services/
│   │   │   └── weatherService.js
│   │   │
│   │   ├── ui/
│   │   │   └── render.js
│   │   │
│   │   ├── utils/
│   │   │   ├── cache.js
│   │   │   └── helpers.js
│   │   │
│   │   └── main.js
│
├── index.html
├── README.md
└── .gitignore