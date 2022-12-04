<!-- 聊天管理 -->

<template>
  <el-row class="chat-row" :gutter="10">
    <el-col :span="8">
      <el-card class="user-list">
        <template #header>
          <el-input :prefix-icon="Search" placeholder="搜索" />
        </template>
        <template v-for="user in userList" :key="user.id">
          <el-row class="chat-user" :gutter="20" @click="handleChat(user)">
            <el-col :span="4" class="user-name">
              <el-badge :value="12" :max="99">
                <el-avatar>{{ user.name }}</el-avatar>
              </el-badge>
            </el-col>
            <el-col :span="20" class="user-content">
              <div class="content time-content">
                <span>{{ user.name }}</span>
                <span class="small-span">昨天</span>
              </div>
              <div class="content message-content">
                <span class="small-span">你干嘛呢？</span>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="chat-area">
        <template #header>
          <span class="current-user">{{ currentUser }}</span>
        </template>
        <div class="chat-content">
          <div class="chat-message"></div>
          <div class="send-message"></div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";

let userList = reactive([{ id: 1, name: "admin" }]); //用户列表
let currentUser = ref(""); //当前聊天的用户

//点击用户进行聊天
const handleChat = (user) => {
  currentUser.value = user.name;
};
</script>

<style lang="less" scoped>
.chat-row {
  height: 100%;
  .el-card {
    height: 100%;
  }
}
:deep(.user-list) {
  .el-card__body {
    height: calc(100% - 69px) !important;
    box-sizing: border-box;
    overflow: auto;
  }
}
.el-avatar {
  --el-avatar-bg-color: var(--el-color-primary);
}
.chat-user {
  height: 60px;
  border-bottom: 1px solid var(--el-border-color-light);
  .user-name {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .content {
      width: 100%;
    }
    .small-span {
      font-size: smaller;
      color: var(--el-color-info);
    }
    .time-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .message-content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
:deep(.chat-area) {
  .current-user {
    display: block;
    height: 32px;
    line-height: 32px;
  }
  .el-card__body {
    height: calc(100% - 69px) !important;
    box-sizing: border-box;
    overflow: auto;
  }
}
.chat-content {
  height: 100%;
  .chat-message {
    height: calc(100% - 100px);
  }
  .send-message {
    height: 100px;
    border-top: 1px solid var(--el-border-color-light);
  }
}
</style>
