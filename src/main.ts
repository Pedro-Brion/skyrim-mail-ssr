import { createSSRApp } from "vue";
import "./styles/main.css";
import App from "./App.vue";
import pinia from "@/stores";

export function createApp() {
  const app = createSSRApp(App);

  app.use(pinia);
  return { app, pinia };
}
