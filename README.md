# 🌤️ Weather App

A modern weather application built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/).

## ⚠️ Limitations

- **OpenWeatherMap API restrictions**: Some features (hourly and weekly forecast) require a paid API plan (Credit Card Details). The app currently uses APIs available under the free tier. Therefore, I'm using mock data for hourly and weekly forecast sections. (Please let me know if I need to change this 😅)
- **TypeScript usage**: The project uses TypeScript, but my typescript knowledge (basic) and skill may be limited in some areas. Improvements and suggestions to typing and stricter TS practices are welcome!
- **Icons and Images**: Some of the weather icons (states e.g rain, thunderstorm) and backgrounds are not provided, I'm just using a default icon and images from figma.

## 🛠️ Installation

```bash
git clone https://github.com/JiaZhengTan/weather-app.git

# Add your own API KEY in env.development
VITE_APP_OPEN_WEATHER_API_KEY=<your_api_key>

npm install

npm run dev
```
