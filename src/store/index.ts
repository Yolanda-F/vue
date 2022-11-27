import { defineStore } from "pinia";

export const useStore = defineStore("index", {
  persist: {
    enabled: true,
  },
  state: () => {
    return {
      userName: "", //用户名
    };
  },
  actions: {},
});
