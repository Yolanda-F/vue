<!-- 导航菜单 -->
<template>
  <el-menu class="nav-menu" :router="true" :default-active="activeIndex">
    <template v-for="item in menuItem" :key="item.index">
      <el-sub-menu :index="item.index" v-if="item.children">
        <template #title>
          <el-icon>
            <component :is="item.icon" class="menu-icon"></component>
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.index"
          :index="child.index"
        >
          <el-icon>
            <component :is="child.icon" class="menu-icon"></component>
          </el-icon>
          <span>{{ child.label }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item :index="item.index" v-else>
        <el-icon>
          <component :is="item.icon" class="menu-icon"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { reactive, ref } from "vue";
import {
  Setting,
  User,
  Avatar,
  Document,
  Grid,
  List,
} from "@element-plus/icons-vue";

const menuItem = reactive([
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
const activeIndex = ref("user"); //默认选中项索引
</script>

<style lang="less">
.nav-menu {
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
</style>
