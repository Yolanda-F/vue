//权限指令
import { useStore } from "@/store/index";

export const permission = {
  mounted(el, binding) {
    const { value } = binding;
    const store = useStore();

    let flag = value.some((p) => {
      return p.indexOf(store.userName) != -1;
    });
    if (!flag) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
};
