import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist"; //pinia持久化
import App from "./App.vue";
import router from "./router/router";
import "./router/index";
import ElementPlus, { ElLoading } from "element-plus";
import "element-plus/dist/index.css";
import "font-awesome/css/font-awesome.css";
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

let loadingInstance; //loading实例
interface requestType {
  url: string | undefined;
  timeId: number;
}
const requestList: requestType[] = []; //请求数组

//关闭loading
function closeLoading(error = null) {
  if (loadingInstance) {
    loadingInstance.close();
    if (error) {
      ElMessage.error(`请求失败：${error}`);
    }
  }
}
//清除添加的延迟
function clearTimeList(url: string | undefined) {
  if (url) {
    const index = requestList.findIndex((d) => d.url == url);
    if (index != -1) {
      clearTimeout(requestList[index].timeId);
      requestList.splice(index, 1);
    }
  }
}

//添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    //或许添加token
    // 请求前添加loading
    const timeId = setTimeout(() => {
      loadingInstance = ElLoading.service({
        fullscreen: true,
        text: "",
      });
    }, 200);
    //记录添加loading的url
    requestList.push({
      url: config.url,
      timeId: timeId,
    });

    return config;
  },
  function (error) {
    clearTimeList(error.config.url);
    closeLoading(error);
    console.log(error);
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    clearTimeList(response.config.url);
    closeLoading();
    return response.data.res;
  },
  function (error) {
    clearTimeList(error.config.url);
    closeLoading(error);
    console.log(error);
    return Promise.reject(error);
  }
);

app.mount("#app");
