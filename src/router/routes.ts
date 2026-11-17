import { RouteRecordRaw } from "vue-router";
import { useMessagesStore } from "@/stores/messages.ts";
import "vue-router";
import { Pinia } from "pinia";

declare module "vue-router" {
  interface RouteMeta {
    status?: number;
    initialState?: (pinia: Pinia) => Promise<void>;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("@/pages/IndexPage.vue"),
        meta: {
          initialState: (pinia) => useMessagesStore(pinia).fetchMessages(),
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/NotFoundPage.vue"),
    meta: {
      status: 404,
    },
  },
];

export default routes;
