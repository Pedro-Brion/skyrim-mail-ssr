import { createApp } from "./main";

const { app, pinia } = createApp();
declare global {
  interface Window {
    //eslint-disable-next-line
    __INITIAL_STATE__: any;
  }
}
if (window.__INITIAL_STATE__) {
  pinia.state.value = window.__INITIAL_STATE__;
}

app.mount("#app");
