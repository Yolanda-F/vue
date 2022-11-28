//组件的权限

export const Permission = {
  admin: ["admin"], //只有管理员能查看
  both: ["admin", "user"], //管理员和普通用户都可以查看
  user: ["user"], //只有用户能查看
};
