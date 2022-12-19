import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/login/Index.vue"),
  },
  {
    path: "/main",
    component: () => import("@/views/navigation/Index.vue"),
    redirect: "/home",
    children: [
      { path: "/home", component: () => import("@/views/Home.vue") },
      { path: "/user", component: () => import("@/views/user/Index.vue") },
      { path: "/role", component: () => import("@/views/role/Index.vue") },
      { path: "/chat", component: () => import("@/views/chat/Index.vue") },
      { path: "/file", component: () => import("@/views/file/Index.vue") },
      {
        path: "/department",
        component: () => import("@/views/department/Index.vue"),
      },
      {
        path: "/center",
        component: () => import("@/views/center/PersonalMessage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
