import { createApp } from "./main";
import { uneval } from "devalue";
import { renderToString } from "vue/server-renderer";

export async function render(url: string) {
  const { app, pinia, router } = createApp();

  router.push(url);
  await router.isReady();
  let status = 200;
  if (router.currentRoute.value.meta) {
    const routeStatus = Number(router.currentRoute.value.meta?.status);
    status = routeStatus || 200;
  }

  if(router.currentRoute.value.meta?.initialState){
    await router.currentRoute.value.meta?.initialState(pinia)
  }

  const html = await renderToString(app);

  const initialState = uneval(pinia.state.value);

  return { html, initialState, status };
}
