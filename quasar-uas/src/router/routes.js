import { admin } from "src/helper/ListAkses";

const routes = [
  {
    path: "/login",
    name: "loginPage",
    component: () => import("pages/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "registerPage",
    component: () => import("pages/auth/Register.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/",
    component: () => import("layouts/AdminLayout.vue"),
    meta: {
      allowedRole: admin.value,
      auth: true,
    },
    children: [
      {
        path: "admin",
        name: "dashboardAdmin",
        component: () => import("pages/admin/Index.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
