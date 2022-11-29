<!-- 主页面导航 -->
<template>
  <el-container class="menu-container">
    <el-aside class="menu-aside">
      <div class="menu-header"></div>
      <NavMenu ref="menuRef"></NavMenu>
    </el-aside>
    <el-container class="menu-main-container">
      <el-header class="menu-main-header">
        <el-row class="menu-main-row">
          <el-col :span="1">
            <el-icon
              v-if="!isExpand"
              @click="handleExpandOrFold"
              :size="iconSize"
              class="expand-icon"
            >
              <Expand />
            </el-icon>
            <el-icon
              v-else
              @click="handleExpandOrFold"
              :size="iconSize"
              class="expand-icon"
            >
              <Fold />
            </el-icon>
          </el-col>
          <el-col :span="1" :offset="20">
            <el-icon :size="iconSize" class="expand-icon">
              <Bell />
            </el-icon>
          </el-col>
          <el-col :span="2">
            <el-dropdown @command="handleCommand">
              <span>
                <el-avatar>{{ store.userName }}</el-avatar>
                <el-icon>
                  <ArrowDown />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="center">个人中心</el-dropdown-item>
                  <el-dropdown-item divided command="exit"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="menu-router-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import NavMenu from "./NavMenu.vue";
import { ArrowDown, Bell, Expand, Fold } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { useStore } from "@/store/index";

const store = useStore();
const router = useRouter();
const menuRef = ref("");
const iconSize = ref(18);
let isExpand = ref(true); //菜单是否展开

//控制子组件折叠或展开菜单
const handleExpandOrFold = () => {
  isExpand.value = !isExpand.value;
  menuRef.value.handleCollapse(!isExpand.value);
};
//点击菜单项,头像处的下拉菜单
const handleCommand = (value) => {
  if (value == "exit") {
    ElMessageBox.confirm("确定退出系统", "提示", {
      cancelButtonText: "取消",
      confirmButtonText: "确认",
      closeOnClickModal: false,
      closeOnPressEscape: false,
      autofocus: false,
      type: "warning",
    }).then(() => {
      router.push("/");
    });
  } else if (value == "center") {
    router.push("/center");
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.menu-container {
  --el-aside-width: auto;

  .menu-aside {
    background-color: #304156;

    .menu-header {
      height: 60px;
    }
  }

  .menu-main-container {
    width: calc(100% - var(--el-aside-width));
  }

  .menu-main-header {
    --el-header-padding: 0;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    .expand-icon:hover {
      color: var(--el-color-primary);
      cursor: pointer;
    }
    .menu-main-row {
      height: 100%;
      width: 100%;
      .el-col {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.el-avatar {
  --el-avatar-bg-color: var(--el-color-primary);
}
.menu-router-main {
  overflow: auto;
}
</style>
