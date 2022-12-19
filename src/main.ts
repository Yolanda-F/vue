import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist"; //pinia持久化
import App from "./App.vue";
import router from "./router/router";
import "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import { ElMessage } from "element-plus";
import { permission } from "./directive/permission";

import "@/assets/style/index.less";
import "@/assets/style/style.less";

const app = createApp(App);
app.use(createPinia().use(piniaPluginPersist));
app.use(router);
app.use(ElementPlus);

//自定义指令
app.directive("permission", permission);

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
