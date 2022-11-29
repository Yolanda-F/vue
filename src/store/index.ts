import { defineStore } from "pinia";

export const useStore = defineStore("index", {
  //持久化存储，默认localstorage
  persist: {
    enabled: true,
    strategies: [
      {
        key: "userName",
        paths: ["userName"],
      },
      {
        key: "activeMenu",
        paths: ["activeMenu"],
      },
      {
        key: "roles",
        paths: ["roles"],
      },
    ],
  },
  state: () => {
    return {
      userName: "", //用户名
      roles: [], //用户角色
      activeMenu: "home",
      userDialogTips: "", //用户操作弹窗的tips
      userDialogVisible: false, //弹窗是否显示
    };
  },
  actions: {
    //清空变量
    clearStore() {
      this.userName = "";
      this.roles = [];
      this.activeMenu = "home";
    },
  },
});
