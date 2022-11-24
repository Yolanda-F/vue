import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import { ElMessage } from "element-plus";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

axios.defaults.baseURL = "";
app.config.globalProperties.$http = axios;

//添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    //或许添加token
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    ElMessage.error(`请求失败：${error}`);
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data.res;
  },
  function (error) {
    ElMessage.error(`请求失败：${error}`);
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

app.mount("#app");
