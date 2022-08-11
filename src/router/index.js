import { createRouter, createWebHistory } from "vue-router";
// hash modeはcraeteWebHashHistoryを使う
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ManageView from "@/views/ManageView.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeView,
  },
  {
    name: "about",
    path: "/about",
    component: AboutView,
  },
  {
    name: "manage",
    // alias: "/manage",
    path: "/manage-music",
    component: ManageView,
  },
  // pathを変更した際に、飛ばしたいパスにredirectさせる
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  // 404の場合、homeに飛ばす
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

export default router;
