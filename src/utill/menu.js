import {
  Setting,
  User,
  Avatar,
  Document,
  Grid,
  ChatDotRound,
  HomeFilled,
} from "@element-plus/icons-vue";

//导航菜单
export const MenuItems = [
  {
    index: "home",
    label: "首页",
    icon: HomeFilled,
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
      },
      {
        index: "role",
        label: "角色管理",
        icon: Avatar,
      },
      {
        index: "department",
        label: "部门管理",
        icon: Grid,
      },
    ],
  },
  {
    index: "chat",
    label: "聊天管理",
    icon: ChatDotRound,
  },
  {
    index: "file",
    label: "文件管理",
    icon: Document,
  },
];
