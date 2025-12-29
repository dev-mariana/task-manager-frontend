import { createPinia } from "pinia";
import { createApp } from "vue";

import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import "./app.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(router);

app.mount("#app");
