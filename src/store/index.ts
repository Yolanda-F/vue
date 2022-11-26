import { defineStore } from "pinia";

export const useStore = defineStore("index", {
  state: () => {
    return {
      userName: "", //用户名
    };
  },
  actions: {},
});
