import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";
import { useMessagesStore } from "./stores/messages";

export async function render(url:string) {
  const { app, pinia, router } = createApp();
  await useMessagesStore(pinia).fetchMessages();

  router.push(url)
  await router.isReady();
  const html = await renderToString(app);

  // Serialize the final state to be sent to the client
  const initialState = JSON.stringify(pinia.state.value);

  return { html, initialState };
}
