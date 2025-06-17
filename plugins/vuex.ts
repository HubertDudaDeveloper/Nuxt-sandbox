import { defineNuxtPlugin } from "#app";
import { store } from "@/src/stores";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
