import { get, post, Delete } from "./http/index";

enum URL {
  addUser = "/user/add",
  userList = "/user/list?",
  findUser = "/user/find/username?username=",
  deleteUser = "/user/delete",
  updateUser = "/user/update",
}

/**
 * 添加用户
 * @param data 用户信息
 * @returns
 */
export const addUserApi = (data: User.UserData) =>
  post<any>({ url: URL.addUser, data });
/**
 * 获取用户列表
 * @param page 当前页
 * @param size 当前页数量
 * @returns
 */
export const getUserListApi = (page: number, size: number) =>
  get<any>({ url: `${URL.userList}page=${page}&size=${size}` });
/**
 * 根据用户名查找用户
 * @param username 用户名
 * @returns
 */
export const findUserApi = (username: string) =>
  get<any>({ url: `${URL.findUser}${username}` });

/**
 * 根据id数组删除用户
 * @param data id数组
 * @returns
 */
export const deleteUsersApi = (data: number[]) =>
  Delete<any>({ url: URL.deleteUser, data });
/**
 * 编辑用户信息
 * @param data
 * @returns
 */
export const updateUserApi = (data: User.UserData) =>
  post<any>({ url: URL.updateUser, data });
