<!-- 聊天管理 -->

<template>
  <el-row class="chat-row" :gutter="10">
    <el-col :span="8">
      <el-card class="user-list">
        <template #header>
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input :prefix-icon="Search" placeholder="搜索" />
            </el-col>
            <el-col :span="4">
              <el-button
                :icon="Plus"
                class="chat-primary-button"
                title="发起群聊"
                @click="handleGroupChat"
              />
            </el-col>
          </el-row>
        </template>
        <template v-for="user in userList" :key="user.id">
          <el-row class="chat-user" @click="handleChat(user)">
            <el-col :span="4" class="user-name">
              <el-badge :value="user.number" :max="99" :hidden="user.hidden">
                <el-avatar>{{ user.name }}</el-avatar>
              </el-badge>
            </el-col>
            <el-col :span="20" class="user-content">
              <div class="content time-content">
                <span class="username-span">{{ user.name }}</span>
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
          <div class="send-message">
            <el-button class="chat-button send-button">发送</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <GroupChat ref="groupRef"></GroupChat>
</template>

<script setup>
import { Plus, Search } from "@element-plus/icons-vue";
import { reactive, ref, onMounted } from "vue";
import GroupChat from "./GroupChat.vue";

let userList = reactive([]); //用户列表
let currentUser = ref(""); //当前聊天的用户
let groupRef = ref();

//点击用户进行聊天
const handleChat = (user) => {
  currentUser.value = user.name;
  user.hidden = true;
};
//发起群聊
const handleGroupChat = () => {
  groupRef.value.showDialog(userList);
};
onMounted(() => {
  userList.length = 0;
  for (let i = 0; i < 20; i++) {
    userList.push({
      id: i,
      name: `user${i}`,
      number: Math.round(Math.random() * 10),
    });
  }
});
</script>

<style lang="less" scoped>
.chat-row {
  width: 100%;
  height: 100%;
  .el-col {
    height: 100%;
  }
  .el-card {
    height: 100%;
  }
}
//用户列表
:deep(.user-list) {
  .el-card__header {
    .el-input {
      .el-input__wrapper {
        background-color: var(--el-color-info-light-8);
      }
    }
  }
  .el-card__body {
    height: calc(100% - 69px) !important;
    background-color: var(--el-color-info-light-8);
    box-sizing: border-box;
    overflow: auto;
    padding: 0;
  }
}
.chat-user {
  height: 60px;
  padding: 5px;
  // border-bottom: 1px solid var(--el-border-color-light);
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
      margin-bottom: 5px;
      .username-span {
        display: inline-block;
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .message-content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
.chat-user:hover {
  background-color: var(--el-color-info-light-7);
}
// 聊天区域
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
:deep(.chat-content) {
  height: 100%;
  --send-message-with: 150px;
  .chat-message {
    height: calc(100% - var(--send-message-with));
  }
  .send-message {
    height: var(--send-message-with);
    border-top: 1px solid var(--el-border-color-light);
    .send-button {
      position: absolute;
      bottom: var(--el-card-padding);
      right: var(--el-card-padding);
    }
  }
}
</style>
