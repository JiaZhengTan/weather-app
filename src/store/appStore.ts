import { TZDate } from "@date-fns/tz";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface City {
  item: {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: { lon: number; lat: number };
  };
  dailyWeatherData: {
    id: number | null;
    temp: number;
    temp_max: number;
    temp_min: number;
    weather: string;
    currentTime: Date;
  };
  lastUpdateTime: Date | string;
}

export const useAppStore = defineStore("appStore", () => {
  const searchBarInput = ref("");
  const selectedCity = ref<City>({
    item: {
      id: 0,
      name: "",
      state: "",
      country: "",
      coord: {
        lon: 0,
        lat: 0,
      },
    },
    lastUpdateTime: "",
    dailyWeatherData: {
      id: null,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
      weather: "",
      currentTime: new TZDate(),
    },
  });
  const selectedCities = ref<City[]>([]);
  const showAddIcon = ref(false);
  const userDetails = ref({
    name: "Jane Doe",
    email: "jane@gmail.com",
    phoneNumber: "1234567890",
  });

  const showMainPage = computed(() => {
    return searchBarInput.value.length === 0;
  });

  const resetSelectedCity = () => {
    selectedCity.value = {
      item: {
        id: 0,
        name: "",
        state: "",
        country: "",
        coord: {
          lon: 0,
          lat: 0,
        },
      },
      lastUpdateTime: new TZDate(),
      dailyWeatherData: {
        id: null,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        weather: "",
        currentTime: new TZDate(),
      },
    };
  };

  return {
    searchBarInput,
    selectedCity,
    selectedCities,
    showAddIcon,
    userDetails,
    showMainPage,
    resetSelectedCity,
  };
});
