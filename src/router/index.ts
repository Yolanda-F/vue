import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/login/Index.vue"),
  },
  {
    path: "/main",
    component: () => import("@/views/navigation/Index.vue"),
    children: [
      { path: "", redirect: "/user" },
      { path: "/user", component: () => import("@/views/user/Index.vue") },
      { path: "/role", component: () => import("@/views/role/Index.vue") },
      { path: "/file", component: () => import("@/views/file/Index.vue") },
      {
        path: "/department",
        component: () => import("@/views/department/Index.vue"),
      },
      { path: "/post", component: () => import("@/views/post/Index.vue") },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
