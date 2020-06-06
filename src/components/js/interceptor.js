import axios from "axios";
import { Message } from "element-ui";

export const request = config => {
  return axios(config);
};

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
