<script setup lang="ts">
import WeatherCard from "./WeatherCard.vue";
import router from "../../router";
import { useAppStore, type City } from "../../store/appStore";

const store = useAppStore();

const handleSelectCity = (city: City) => {
  store.selectedCity = city;
  store.showAddIcon = false;

  router.push({ path: "/weather-detail" });
};
</script>

<template>
  <section class="mt-6">
    <button
      v-for="city in store.selectedCities"
      :key="city.item.id"
      class="mb-3 w-full cursor-pointer"
      @click="handleSelectCity(city)"
    >
      <WeatherCard :city="city" />
    </button>
  </section>
</template>
