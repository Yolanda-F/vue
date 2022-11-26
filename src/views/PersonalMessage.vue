<!-- 个人中心 -->
<template>
  <el-row :gutter="20" class="person-message">
    <el-col :span="6">
      <el-card header="个人信息">
        <div class="message">
          <div class="message-header">
            <el-avatar :size="100">{{ store.userName }}</el-avatar>
          </div>
          <ul class="message-list">
            <li v-for="item in messageList" :key="item.key">
              <div class="message-icon">
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                {{ item.label }}
              </div>
              <div>{{ message[item.key] }}</div>
            </li>
            <li>
              <div class="message-icon">
                <el-icon>
                  <WarnTriangleFilled />
                </el-icon>
                安全设置
              </div>
              <div class="change-password">修改密码</div>
            </li>
          </ul>
        </div>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card></el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { useStore } from "@/store/index";
import { Medal, User, WarnTriangleFilled } from "@element-plus/icons-vue";
import { reactive } from "vue";

const store = useStore();
const messageList = reactive([
  { label: "登录账号", key: "id", icon: User },
  { label: "用户昵称", key: "userName", icon: Medal },
]);
let message = reactive({
  id: "test",
  userName: "test",
});
</script>

<style lang="less" scoped>
.person-message {
  height: 100%;
  .message {
    width: 100%;
    height: 100%;
    .message-header {
      width: 100%;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .message-list {
      width: 100%;
      height: calc(100% - 150px);
      list-style: none;
      padding: 0;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--el-border-color-light);
        padding: 5px 0;
      }
      .message-icon {
        display: flex;
        align-items: center;
      }
    }
    .change-password {
      color: var(--el-color-primary);
    }
    .change-password:hover {
      cursor: pointer;
    }
  }
}
:deep(.el-card) {
  height: 100%;
  .el-card__body {
    height: calc(100% - 58px) !important;
    box-sizing: border-box;
  }
}
.el-avatar {
  --el-avatar-text-size: 16px;
}
</style>
