<script setup lang="ts">
import Fuse from "fuse.js";
import { useAppStore, type City } from "../../store/appStore";
import { onBeforeMount, ref } from "vue";
import router from "../../router";

const store = useAppStore();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fuse: any;
let cityList: string[] = [];

const listOfCities = ref<City[]>();

const searchCity = () => {
  listOfCities.value = fuse.search(store.searchBarInput, { limit: 5 });
};

const handleSearch = (city: City) => {
  store.selectedCity = { ...city, lastUpdateTime: "" };
  store.searchBarInput = "";
  store.showAddIcon = true;

  router.push({ path: "/weather-detail" });
};

const handleSearchEnter = () => {
  // Note: For now just select the first result
  // we can use arrows to select is better
  if (listOfCities.value && listOfCities.value.length > 0) {
    handleSearch(listOfCities.value[0]);
  }
};

const onInput = debounce(searchCity, 500);

function debounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

onBeforeMount(() => {
  fetch("city.list.json")
    .then((response) => response.json())
    .then((json) => {
      cityList = json; // use the data
    })
    .then(() => {
      const fuseOption = {
        threshold: 0.4,
        ignoreLocation: true,
        keys: ["name"],
      };

      fuse = new Fuse(cityList, fuseOption);
    });
});
</script>

<template>
  <section class="mt-2">
    <label
      class="w-full inline-flex gap-3 p-2.5 px-4 rounded-[10px] focus-within:outline-indigo-500 focus-within:outline-2"
      for="search"
      style="background-color: #f7f7f9"
    >
      <img
        src="../../assets/icons/magnifying-glass.svg"
        alt="search-icon"
        width="18px"
      />
      <form @submit.prevent="handleSearchEnter" class="w-full">
        <input
          id="search"
          v-model="store.searchBarInput"
          type="search"
          placeholder="Search for a city or airport"
          autocomplete="off"
          class="w-full focus:outline-none"
          @input="onInput"
        />
      </form>
    </label>
    <template v-if="!store.showMainPage">
      <div class="mt-4">
        <ul
          v-for="city in listOfCities"
          :key="city.item.id"
          class="cursor-pointer"
        >
          <li class="border-b p-2 border-[#D4D4D4]" @click="handleSearch(city)">
            {{ city.item.name }},
            <span class="text-[#545454]">
              {{ city.item.state }} {{ city.item.country }}
            </span>
          </li>
        </ul>
      </div>
    </template>
  </section>
</template>
