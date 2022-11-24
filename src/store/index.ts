import { defineStore } from "pinia";

export const useStore = defineStore("index", {
  state: () => {
    return {
      count: 0,
    };
  },
  actions: {},
});
