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
      {
        path: "products",
        name: "dataProductsAdmin",
        component: () => import("pages/admin/products/Index.vue"),
      },
      {
        path: "products/edit/:id",
        name: "editDataProductsAdmin",
        component: () => import("pages/admin/products/Edit.vue"),
      },
      {
        path: "transactions",
        name: "dataTransactionsAdmin",
        component: () => import("pages/admin/transactions/Index.vue"),
      },
      {
        path: "transactions/edit/:id",
        name: "editDataTransactionsAdmin",
        component: () => import("pages/admin/transactions/Edit.vue"),
      },
      {
        path: "brands",
        name: "dataBrandsAdmin",
        component: () => import("pages/admin/brands/Index.vue"),
      },
      {
        path: "categories",
        name: "dataCategoriesAdmin",
        component: () => import("pages/admin/categories/Index.vue"),
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
