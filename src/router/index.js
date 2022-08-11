import { createRouter, createWebHistory } from "vue-router";
// hash modeはcraeteWebHashHistoryを使う
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ManageView from "@/views/ManageView.vue";
import useUserStore from "@/stores/user";

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
    beforeEnter: (to, from, next) => {
      next();
    },
    meta: {
      requiresAuth: true,
    },
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

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }
  const store = useUserStore();
  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
