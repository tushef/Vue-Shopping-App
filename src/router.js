import Vue from "vue";
import Router from "vue-router";
import ShoppingBlock from "./views/ShoppingBlock.vue";
import Cart from "./views/Cart.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: ShoppingBlock
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
    }
  ]
});
