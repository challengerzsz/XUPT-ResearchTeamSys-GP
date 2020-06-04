// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import "layui-src/dist/css/layui.css";
import "layui-src/dist/layui.all.js";
import "jquery/dist/jquery.min.js";
import { Message } from "element-ui";

Vue.prototype.$axios = axios;
Vue.prototype.HOST = "/api";
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("TOKEN");
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    Message.error({ message: err });
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  data => {
    if (data.data.status == 0) {
      Message.error({ message: data.data.msg });
      return;
    }
    if (data.data.status == 1) {
      Message.success({ message: data.data.msg });
    }
    return data;
  },
  err => {
    if (err.response.status == 504) {
      Message.error({ message: "请求API超时!" });
    } else if (err.response.status == 401) {
      Message.error({ message: "未通过鉴权!" });
    } else {
      Message.error({ message: "未知错误!" });
    }
    return Promise.resolve(err);
  }
);
