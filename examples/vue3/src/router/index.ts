import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../views/layout/DefaultLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/pages",
      component: DefaultLayout,
      redirect: "/pages/page1",
      children: [
        {
          path: "page1",
          name: "page1",
          component: () => import("../views/pages/Page1.vue"),
        },
        {
          path: "page2",
          name: "page2",
          component: () => import("../views/pages/Page2.vue"),
        },
        {
          path: "page3",
          name: "page3",
          component: () => import("../views/pages/Page3.vue"),
        },
        {
          path: "page/:id",
          name: "pageWithParameter",
          component: () => import("../views/pages/PageWithParameter.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/About.vue"),
    },
  ],
});

export default router;
