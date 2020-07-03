import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import addSmoothie from "@/components/addSmoothie";
import edit from "@/components/editSmoothie";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/add-smoothies",
      name: "addSmoothie",
      component: addSmoothie
    },
    { path: "/edit-smoothie/:smoothie_slug", component: edit, name: "edit" }
  ]
});
