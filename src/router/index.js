import router from "./router";
import { useStore } from "@/store/index";

//前置守卫
router.beforeEach((to, from, next) => {
  const store = useStore();
  // console.log(from.path, to.path, store.userName);
  //只要是去登录页面，放行
  if (to.path == "/") {
    next();
  } else if (to.path == "/home") {
    //要去主页，必须从登录页面进入,并且存在登录状态
    if (from.path == "/" && store.userName != "") {
      next();
    } else {
      next({ path: "/" });
    }
  } else {
    if (store.userName != "") {
      next();
    } else {
      next({ path: "/" });
    }
  }

  //刷新停留在当前页面
  if (to.path == from.path && store.userName != "") {
    next();
  } else {
    next({ path: "/" });
  }
});
