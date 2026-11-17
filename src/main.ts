import { createSSRApp } from "vue";
import "./styles/main.css";
import { createPinia } from "./stores/index.ts";
import App from "./App.vue";
import createRouter from "@/router";

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const pinia = createPinia()
  app.use(pinia);
  app.use(router);
  return { app, pinia, router };
}
