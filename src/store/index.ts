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
    ],
  },
  state: () => {
    return {
      userName: "", //用户名
      roles: [], //用户角色
      count: 1,
    };
  },
  actions: {},
});
