import { createSSRApp } from "vue";
import "./styles/main.css";
import App from "./App.vue";
import pinia from "@/stores";
import createRouter from "@/router";

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  app.use(pinia);
  app.use(router);
  return { app, pinia };
}
