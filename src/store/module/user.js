import { login, get_user_info } from "@/api/train";
import { setToken, getToken } from "@/utils/token";

export default {
  state: {
    token: getToken(),
    userName: "",
    userInfo: ""
  },

  getters: {
    // 获取用户信息
    userInfoData: state => state.userInfo
  },

  mutations: {
    // 设置 token
    setLoginToken(state, token) {
      state.token = token;
      setToken(token);
    },

    // 存储用户名
    setUserName(state, name) {
      state.userName = name;
    },

    // 存储所有用户信息
    setUserInfo(state, data) {
      state.userInfo = data;
    },

    // 清除 token
    clearLoginToken(state, token) {
      state.token = token;
      setToken(token);
    }
  },

  actions: {
    // 路由拦截
    verifyRoute({ state, commit }, { toUrl }) {},

    // 登录
    handleLogin({ commit }, { username, password, rememberMe }) {
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          rememberMe
        })
          .then(res => {
            // 存储 token
            commit("setLoginToken", res.data.access_token);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 获取用户相关信息
    handleGetUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          get_user_info(state.token)
            .then(res => {
              // 存储用户名
              commit("setUserName", res.data.userRealname);
              // 存储所有用户信息
              commit("setUserInfo", res.data);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        } catch (error) {
          reject(error);
        }
      });
    },

    // 清除 token
    handleClearToken({ state, commit }) {
      commit("clearLoginToken", "");
    }
  }
};
