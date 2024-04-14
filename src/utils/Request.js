import axios from "axios";
import { baseURL } from "../config";

const instance = axios.create({
  baseURL,
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (sessionStorage.getItem("token")) {
      config.headers.token = sessionStorage.getItem("token");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
