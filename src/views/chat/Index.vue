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
            <div class="tool">
              <div class="fa-tool">
                <el-popover
                  placement="top"
                  trigger="click"
                  popper-class="emoji-popper"
                >
                  <template #reference>
                    <i class="fa fa-smile-o fa-lg" title="表情"></i>
                  </template>
                  <picker
                    :data="emojiIndex"
                    :showSearch="false"
                    :showPreview="false"
                    :showCategories="false"
                    :emojiTooltip="false"
                    :i18n="{ categories: { smileys: '' } }"
                    @select="addEmoji"
                  />
                </el-popover>
                <el-upload
                  action=""
                  :limit="1"
                  :show-file-list="false"
                  class="upload-demo"
                >
                  <i class="fa fa-folder-o fa-lg" title="发送文件"></i>
                </el-upload>
              </div>
            </div>
            <div class="message-input">
              <el-input
                v-model="inputMessage"
                autofocus
                resize="none"
                type="textarea"
                placeholder=""
              />
            </div>
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
import data from "emoji-mart-vue-fast/data/all.json";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import "emoji-mart-vue-fast/css/emoji-mart.css";

//表情包组件
let emojisToShowFilter = function () {
  return true;
};
let include = ["smileys"];
let emojiIndex = new EmojiIndex(data, { emojisToShowFilter, include });

let userList = reactive([]); //用户列表
let currentUser = ref(""); //当前聊天的用户
let groupRef = ref();
let inputMessage = ref("");

//点击用户进行聊天
const handleChat = (user) => {
  currentUser.value = user.name;
  user.hidden = true;
};
//发起群聊
const handleGroupChat = () => {
  groupRef.value.showDialog(userList);
};
//添加表情
const addEmoji = (emoji) => {
  inputMessage.value += emoji.native;
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
    overflow: hidden;
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
    position: relative;
    .tool {
      height: 32px;
      .fa-tool {
        height: 100%;
        display: flex;
        align-items: center;
        .fa {
          color: #606266;
          margin-right: 20px;
        }
        .fa:hover {
          cursor: pointer;
        }
        .upload-demo {
          height: 16px;
        }
      }
    }
    .message-input {
      height: calc(100% - 32px - 32px);
      overflow: auto;
    }
    .send-button {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
:deep(.el-textarea) {
  height: 100%;
  .el-textarea__inner {
    padding: 0;
    height: 100% !important;
    box-shadow: none;
  }
}
</style>
<style lang="less">
// 表情包组件
.emoji-mart-category-label {
  display: none;
}
.emoji-popper {
  width: auto !important;
  .emoji-mart {
    border: none;
  }
}
</style>
