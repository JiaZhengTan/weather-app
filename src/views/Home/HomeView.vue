<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import WeatherList from "./WeatherList.vue";
import HomeHeader from "./HomeHeader.vue";
import { useAppStore } from "../../store/appStore";
import { onMounted } from "vue";
import {
  fetchCurrentWeather,
  fetchCurrentLocationCity,
} from "../../reusables/openWeatherMapAPI";
import { TZDate } from "@date-fns/tz";

const store = useAppStore();

onMounted(() => {
  if (localStorage.getItem("geoRequested")) return;

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
  } else {
    const success = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      const [locationData, weatherData] = await Promise.all([
        fetchCurrentLocationCity(latitude, longitude),
        fetchCurrentWeather(latitude, longitude),
      ]);

      if (!locationData || !weatherData) {
        alert("Unable to retrieve your location");
        return;
      }

      const { lat, lon, name, state, country } = locationData[0];
      const { id, temp, temp_max, temp_min } = weatherData.main;

      store.selectedCities.push({
        item: {
          // Note: Might need to generate a unique id
          id: 1,
          name,
          state,
          country: country,
          coord: {
            lon,
            lat,
          },
        },
        lastUpdateTime: new Date(),
        dailyWeatherData: {
          id,
          temp,
          temp_max,
          temp_min,
          weather: weatherData.weather[0].main,
          currentTime: new TZDate(
            (weatherData.dt + weatherData.timezone) * 1000,
            "UTC"
          ),
        },
      });

      localStorage.setItem("geoRequested", "true");
    };

    const failed = () => {
      alert("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(success, failed);
  }
});
</script>

<template>
  <div class="content">
    <!--  Header -->
    <template v-if="store.showMainPage">
      <HomeHeader />
    </template>

    <!-- Search bar -->
    <SearchBar />

    <!-- Weather list -->
    <template v-if="store.showMainPage">
      <main>
        <WeatherList />
      </main>
    </template>
  </div>
</template>
