<script setup lang="ts">
import { TZDate } from "@date-fns/tz";
import { useAppStore } from "../../store/appStore";
import { computed, onBeforeMount, ref } from "vue";
import HourlyForecast from "./HourlyForecast/HourlyForecast.vue";
import WeeklyForecast from "./WeeklyForecast/WeeklyForecast.vue";
import TopSection from "./TopSection/TopSection.vue";
import { fetchCurrentWeather } from "../../reusables/openWeatherMapAPI";

const store = useAppStore();

const loading = ref(false);

const selectedCity = computed(() => {
  return store.selectedCity?.item;
});

onBeforeMount(async () => {
  if (!store.selectedCity?.lastUpdateTime) {
    store.selectedCity.lastUpdateTime = new TZDate();

    const coords = selectedCity.value.coord;

    try {
      loading.value = true;
      const data = await fetchCurrentWeather(coords.lat, coords.lon);

      if (!data) throw new Error("No data!");

      const { id, temp, temp_max, temp_min } = data.main;

      store.selectedCity.dailyWeatherData = {
        id: id,
        temp: temp,
        temp_max: temp_max,
        temp_min: temp_min,
        weather: data.weather[0].main,
        currentTime: new TZDate((data.dt + data.timezone) * 1000, "UTC"),
      };
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
});
</script>

<template>
  <template v-if="loading">Loading...</template>
  <template v-else>
    <!-- Top section -->
    <TopSection />
    <!-- Hourly forecast -->
    <HourlyForecast />
    <!-- Weekly forecast -->
    <WeeklyForecast />
  </template>
</template>

<style scoped>
.bg-weather-detail {
  background: linear-gradient(
    118.25deg,
    #4f80fa 1.2%,
    #3764d7 59.26%,
    #335fd1 79.2%
  );
}
</style>
