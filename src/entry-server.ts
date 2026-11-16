import { createApp } from "./main";
import { uneval } from "devalue";
import { renderToString } from "vue/server-renderer";
import { useMessagesStore } from "./stores/messages";

export async function render(url: string) {
  const { app, pinia, router } = createApp();
  await useMessagesStore(pinia).fetchMessages();

  router.push(url);
  await router.isReady();
  const html = await renderToString(app);

  const initialState = uneval(pinia.state.value);

  return { html, initialState };
}
