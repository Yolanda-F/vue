import "./config";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist"; //pinia持久化
import App from "./App.vue";
import router from "./router/router";
import "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "font-awesome/css/font-awesome.css";
import { permission } from "./directive/permission";
// import * as ElementPlusIconVue from "@element-plus/icons-vue";

import "@/assets/style/index.less";
import "@/assets/style/style.less";

const app = createApp(App);
app.use(createPinia().use(piniaPluginPersist));
app.use(router);
app.use(ElementPlus);
// for (const [key, component] of Object.entries(ElementPlusIconVue)) {
//   app.component(key, component);
// }

//自定义指令
app.directive("permission", permission);

app.mount("#app");
