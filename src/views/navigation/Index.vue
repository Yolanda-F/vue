<!-- 主页面导航 -->
<template>
  <el-container class="menu-container">
    <el-aside width="200px" class="menu-aside">
      <div class="menu-header"></div>
      <NavMenu></NavMenu>
    </el-aside>
    <el-container>
      <el-header class="menu-main-header"></el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import NavMenu from "./NavMenu.vue";
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.menu-aside {
  background-color: #304156;
}

.menu-header {
  height: 60px;
}

.menu-main-header {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
}
</style>
