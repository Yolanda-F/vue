<!-- 导航菜单 -->
<template>
  <el-menu
    class="nav-menu"
    :router="true"
    :default-active="activeIndex"
    :collapse="isCollapse"
    unique-opened
  >
    <template v-for="item in menuItem" :key="item.index">
      <el-sub-menu
        :index="item.index"
        v-if="item.children"
        popper-class="menu-popper"
      >
        <template #title>
          <el-icon>
            <component :is="item.icon" class="menu-icon"></component>
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <template v-for="child in item.children" :key="child.index">
          <el-menu-item :index="child.index">
            <el-icon>
              <component :is="child.icon" class="menu-icon"></component>
            </el-icon>
            <template #title>{{ child.label }}</template>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <template v-else>
        <el-menu-item :index="item.index">
          <el-icon>
            <component :is="item.icon" class="menu-icon"></component>
          </el-icon>
          <template #title>{{ item.label }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script setup>
import { reactive, ref, defineExpose } from "vue";
import {
  Setting,
  User,
  Avatar,
  Document,
  Grid,
  List,
  HomeFilled,
} from "@element-plus/icons-vue";

//菜单项
const menuItem = reactive([
  { index: "home", label: "首页", icon: HomeFilled },
  {
    index: "system",
    label: "系统管理",
    icon: Setting,
    children: [
      { index: "user", label: "用户管理", icon: User },
      { index: "role", label: "角色管理", icon: Avatar },
      { index: "department", label: "部门管理", icon: Grid },
      { index: "post", label: "岗位管理", icon: List },
    ],
  },
  { index: "file", label: "文件管理", icon: Document },
]);
const activeIndex = ref("home"); //默认选中项索引
let isCollapse = ref(false); //是否折叠

//设置菜单折叠状态
const handleCollapse = (value) => {
  isCollapse.value = value;
};
defineExpose({ handleCollapse }); //暴露函数
</script>

<style lang="less">
.nav-menu {
  width: 200px;
  --el-menu-bg-color: transparent;
  --el-menu-text-color: #fff;
  height: calc(100% - 60px);
  border: none;

  .el-sub-menu__title:hover,
  .el-menu-item:hover {
    background-color: #263445 !important;
  }

  // 第二层菜单颜色
  .el-sub-menu {
    .el-menu {
      background-color: #1f2d3d !important;
    }

    .el-menu-item:hover {
      background-color: #001528 !important;
    }
  }

  .menu-icon {
    height: 100%;
    width: 100%;
  }
}
.menu-popper {
  .el-menu {
    --el-menu-bg-color: #304156;
    --el-menu-text-color: #fff;
    .el-menu-item:hover {
      background-color: #263445 !important;
    }
  }
}
</style>
