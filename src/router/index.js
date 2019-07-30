import Vue from "vue";
import Router from "vue-router";
import routes from "./router-data";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  routes: routes
});

// 路由跳转之前
router.beforeEach((to, from, next) => {
  store
    .dispatch("verifyRoute", { toUrl: to })
    .then(res => {
      next();
    })
    .catch(err => {
      next();
    });
});

// 路由跳转之后
router.afterEach(to => {});

export default router;
