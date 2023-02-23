import { get, post, Delete } from "./http/index";

enum URL {
  getRoleList = "/FRole/selectAll/page?",
  addRole = "/FRole/add",
  deleteRole = "FRole/delete",
  findRoleName = "FRole/selectByname?roleName=",
}

/**
 * 获取角色列表
 * @param page 当前页
 * @param size 当前页数量
 * @returns
 */
export const getRoleListApi = (page: number, size: number) =>
  get({ url: `${URL.getRoleList}page=${page}&size=${size}` });
/**
 * 添加或修改角色
 * @param data
 * @returns
 */
export const addRoleApi = (data: RoleType) => post({ url: URL.addRole, data });
/**
 * 删除角色
 * @param data id数组
 * @returns
 */
export const deleteRoleApi = (data: number[]) =>
  Delete({ url: URL.deleteRole, data });
/**
 * 根据角色名查找角色
 * @param roleName 角色名称
 * @returns
 */
export const findRoleNameApi = (roleName: string) =>
  get({ url: `${URL.findRoleName}${roleName}` });
