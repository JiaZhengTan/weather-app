export const fetchCurrentLocationCity = async (
  latitude: number,
  longitude: number
) => {
  const params = {
    lat: latitude,
    lon: longitude,
    appid: import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY,
  };

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${params.lat}&lon=${params.lon}&limit=1&appid=${params.appid}`
    );

    if (!response.ok) {
      throw new Error(`Error when fetching - status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchCurrentWeather = async (lat: number, lon: number) => {
  const params = {
    lat: lat,
    lon: lon,
    appid: import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY,
  };

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${params.appid}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Error when fetching - status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
