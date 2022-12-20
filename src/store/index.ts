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
        key: "menuBread",
        paths: ["menuBread"],
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
      menuBread: ["home"], //菜单--面包屑
    };
  },
  actions: {
    //清空变量
    clearStore() {
      this.userName = "";
      this.roles = [];
      this.activeMenu = "home";
      this.menuBread = ["home"];
    },
    //根据点击的菜单项更新面包屑
    updateBread(value: string[]) {
      this.menuBread.length = 0;
      this.menuBread.push(...value);
    },
  },
});
