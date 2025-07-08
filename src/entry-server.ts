import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";
import { useMessagesStore } from "./stores/messages";

export async function render() {
  const { app, pinia } = createApp();

  const postStore = useMessagesStore(pinia);
  await postStore.fetchMessages();

  const html = await renderToString(app);

  // Serialize the final state to be sent to the client
  const initialState = JSON.stringify(pinia.state.value);

  return { html, initialState };
}
