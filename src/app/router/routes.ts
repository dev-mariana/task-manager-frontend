import AppLayout from "@/shared/layouts/AppLayout.vue";
import type { RouteRecordRaw } from "vue-router";
import HomePage from "../modules/pages/HomePage.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        name: "Home",
        path: "",
        component: HomePage,
      },
    ],
  },
];
