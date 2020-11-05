import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/views/Login.vue";
import Projects from "@/views/Projects.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Root Redirect",
    redirect: "/login"
  },

  {
    path: "/login",
    name: "Login",
    component: Login
  },

  {
    path: "/projects",
    name: "Projects",
    component: Projects
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
