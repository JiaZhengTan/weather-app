<script setup lang="ts">
import { format } from "date-fns";
import { computed } from "vue";

const props = defineProps({
  city: {
    type: Object,
    default: () => ({}),
    required: true,
  },
});

const dailyWeatherData = computed(() => {
  return props.city.dailyWeatherData;
});
</script>

<template>
  <article class="p-3 h-32 rounded-2xl bg-blue-500 text-white">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col text-start">
        <h2>{{ props.city.item.name }}</h2>
        <p>
          {{ format(dailyWeatherData.currentTime, "hh:mm a") }}
        </p>
      </div>
      <div class="flex leading-none">
        <p class="tracking-wider font-thin text-[3.5rem]">
          {{ Math.round(dailyWeatherData.temp) }}°C
        </p>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-4 font-thin">
      <p>{{ dailyWeatherData.weather }}</p>
      <div class="flex gap-3">
        <span>H:{{ Math.round(dailyWeatherData.temp_max) }}°C</span>
        <span>L:{{ Math.round(dailyWeatherData.temp_min) }}°C</span>
      </div>
    </div>
  </article>
</template>
