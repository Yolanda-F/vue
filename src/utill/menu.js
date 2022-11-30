import {
  Setting,
  User,
  Avatar,
  Document,
  Grid,
  // List,
  HomeFilled,
} from "@element-plus/icons-vue";
// import { Permission } from "./permission";

//导航菜单
export const MenuItems = [
  {
    index: "home",
    label: "首页",
    icon: HomeFilled,
    // permission: Permission.both,
  },
  {
    index: "system",
    label: "系统管理",
    icon: Setting,
    children: [
      {
        index: "user",
        label: "用户管理",
        icon: User,
        // permission: Permission.both,
      },
      {
        index: "role",
        label: "角色管理",
        icon: Avatar,
        // permission: Permission.admin,
      },
      {
        index: "department",
        label: "部门管理",
        icon: Grid,
        // permission: Permission.admin,
      },
      // {
      //   index: "post",
      //   label: "岗位管理",
      //   icon: List,
      //   permission: Permission.admin,
      // },
    ],
  },
  {
    index: "file",
    label: "文件管理",
    icon: Document,
    // permission: Permission.both,
  },
];
