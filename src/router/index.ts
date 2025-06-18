import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "../store/appStore";
import HomeView from "../views/Home/HomeView.vue";
import WeatherDetail from "../views/WeatherDetail/WeatherDetail.vue";
import UserDetail from "../views/UserDetails/UserDetail.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/weather-detail", component: WeatherDetail },
  { path: "/user-details", component: UserDetail },
  { path: "/:pathMatch(.*)*", component: HomeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.path === "/weather-detail" && !useAppStore().selectedCity.item.name) {
    next({ path: "/" });
  } else next();
});

export default router;
