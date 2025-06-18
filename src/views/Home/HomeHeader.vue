<script setup lang="ts">
import router from "../../router";
</script>

<template>
  <header class="flex justify-between">
    <h1>Weather</h1>
    <button
      class="cursor-pointer"
      @click="router.push({ path: '/user-details' })"
    >
      <img
        src="../../assets/icons/person.svg"
        width="24px"
        alt=""
        aria-label="User details"
      />
    </button>
  </header>
</template>
