import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "/",
        component: import("@/pages/IndexPage.vue"),
      },
    ],
  },
];

export default routes;
