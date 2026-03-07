import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home/Home.vue";
import Palette from "../components/Palette/Palette.vue";
import Collections from "../components/Palette/Collections.vue";
import Potions from "../components/Palette/Potions.vue";
import Ports from "../components/Ports/Ports.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { hideNavbar: true, hideFooter: true },
    },
    {
      path: "/palette",
      component: Palette,
      redirect: { name: "Collections" },
      children: [
        {
          path: "collections",
          name: "Collections",
          component: Collections,
        },
        {
          path: "potions",
          name: "Potions",
          component: Potions,
        },
      ],
    },
    {
      path: "/ports",
      name: "Ports",
      component: Ports,
    },
  ],
});

export default router;
