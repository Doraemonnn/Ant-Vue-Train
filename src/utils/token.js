import Cookies from "js-cookie";

// 设置 token
export const setToken = token => {
  // token在Cookie中存储的天数，默认1天
  Cookies.set("token", token, { expires: 1 });
};

// 获取 token
export const getToken = () => {
  const token = Cookies.get("token");
  if (token) return token;
  else return false;
};
