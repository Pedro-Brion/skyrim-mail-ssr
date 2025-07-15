import { createSSRApp } from "vue";
import "./styles/main.css";
import App from "./App.vue";
import pinia from "@/stores";
import router from "@/router";

export function createApp() {
  const app = createSSRApp(App);

  app.use(pinia);
  app.use(router);
  return { app, pinia };
}
