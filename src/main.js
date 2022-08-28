import { createApp } from "vue";
import { createPinia } from "pinia";
import VeeValidatePlugin from "./includes/validation";
import { auth } from "./includes/firebase";

import App from "./App.vue";
import router from "./router";
import Icon from "./directives/icon";

import "./assets/base.css";
import "./assets/base.css";
import "nprogress/nprogress.css";
import i18n from "./includes/i18n";
import { registerSW } from "virtual:pwa-register";
import GlobalComponets from "./includes/_global";
import progressBar from "./includes/progress-bar";

registerSW({ immediate: true });
progressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(i18n);
    app.use(GlobalComponets);
    app.directive("icon", Icon);

    app.mount("#app");
  }
});
