import Vue from "vue";
import Vuex from "vuex";

// user 模块
import user from "./module/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  mutations: {},

  actions: {},

  modules: {
    user
  }
});
