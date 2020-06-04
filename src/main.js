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
    return Promise.reject(err);
  }
);
