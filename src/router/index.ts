import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/common/Home.vue";
import Pallete from "../components/Pallete/Pallete.vue";
import Collections from "../components/Pallete/Collections.vue";
import Potions from "../components/Pallete/Potions.vue";
import Ports from "../components/Ports/Ports.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/pallete",
            component: Pallete,
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