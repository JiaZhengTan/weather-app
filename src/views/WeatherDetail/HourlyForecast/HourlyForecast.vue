<script setup lang="ts">
import HourlyForecastCard from "./HourlyForecastCard.vue";
</script>

<template>
  <section class="content py-0! mt-5">
    <h2 class="font-medium!">Hourly Forecast</h2>
    <div class="flex flex-row gap-3 overflow-auto mt-5">
      <!-- Note: Pass data from HourlyForecastAPI to HourlyForecastCard -->
      <template v-for="i in 24" :key="i">
        <HourlyForecastCard />
      </template>
    </div>
  </section>
</template>
