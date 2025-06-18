<script setup lang="ts">
import WeeklyForecastCard from "./WeeklyForecastCard.vue";
</script>

<template>
  <section class="content py-0! mt-5">
    <h2 class="font-medium!">Weekly Forecast</h2>
    <div class="flex flex-col gap-3 overflow-y-auto mt-5 h-[42vh]">
      <template v-for="i in 7" :key="i">
        <WeeklyForecastCard />
      </template>
    </div>
  </section>
</template>
