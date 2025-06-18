<script setup lang="ts">
import { useAppStore } from "../../../store/appStore";
import { computed } from "vue";
import { format } from "date-fns";
import router from "../../../router";

const store = useAppStore();

const selectedCity = computed(() => {
  return store.selectedCity;
});

const handleAddOrDelete = () => {
  if (store.showAddIcon) {
    handleAddWeatherToList();
  } else {
    handleDeleteWeatherFromList();
  }
};

const handleDeleteWeatherFromList = () => {
  store.selectedCities = store.selectedCities.filter(
    (city) => city.item.id !== store.selectedCity.item.id
  );
  store.resetSelectedCity();
  router.push({ path: "/" });
};

const handleAddWeatherToList = () => {
  store.selectedCities.push(store.selectedCity);
  store.resetSelectedCity();
  router.push({ path: "/" });
};
</script>

<template>
  <div class="bg-weather-detail h-[370px] text-white">
    <div class="content flex flex-row justify-between">
      <button
        class="cursor-pointer"
        @click="router.push({ path: '/' })"
        aria-label="Go back to home page"
      >
        <img
          src="../../../assets/icons/back-arrow.svg"
          alt=""
          role="presentation"
        />
      </button>
      <p class="text-sm">
        {{ selectedCity.item.name }}, {{ selectedCity.item.country }}
      </p>
      <button
        class="cursor-pointer"
        @click="handleAddOrDelete()"
        aria-label="Add weather to list"
      >
        <template v-if="store.showAddIcon">
          <img
            src="../../../assets/icons/add-icon.svg"
            alt=""
            role="presentation"
          />
        </template>
        <template v-else>
          <img
            src="../../../assets/icons/trash.svg"
            alt="trashcan icon"
            role="presentation"
          />
        </template>
      </button>
    </div>
    <div class="flex flex-col items-center text-center mt-4">
      <p class="text-sm">
        {{
          format(
            selectedCity.dailyWeatherData?.currentTime,
            "cccc, d LLLL yyyy"
          )
        }}
      </p>
      <img
        class="mt-4"
        src="../../../assets//icons/weather-icons/moderate-rain.svg"
        alt="weather icon"
      />
      <div class="flex flex-col text-xl">
        <p>{{ Math.round(selectedCity.dailyWeatherData.temp) }}° C</p>
        <p class="font-semibold">{{ selectedCity.dailyWeatherData.weather }}</p>
      </div>
      <div class="flex flex-row justify-center mt-5 gap-2 font-thin text-sm">
        <span>
          Last Update
          {{ format(selectedCity?.lastUpdateTime, "hh:mm a") }}
        </span>
        <img src="../../../assets/icons/refresh-arrow.svg" alt="refresh icon" />
      </div>
    </div>
  </div>
</template>
