<!-- 群聊 -->
<template>
  <el-dialog
    v-model="dialogVisibile"
    width="45%"
    custom-class="group-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :align-center="true"
    :show-close="false"
  >
    <el-row>
      <el-col :span="12" class="user-col">
        <div class="header">
          <el-input :prefix-icon="Search" placeholder="搜索" />
        </div>
        <div class="content">
          <el-tree
            :data="userList"
            :props="defaultProps"
            class="user-tree"
            show-checkbox
            node-key="id"
            ref="treeRef"
            @check="handleCheck"
          >
            <template #default="{ node }">
              <div class="custom-tree-node">
                <el-avatar size="small">{{ node.label }}</el-avatar>
                <span class="user-label">{{ node.label }}</span>
              </div>
            </template>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="12" class="choose-col">
        <div class="header">选择联系人</div>
        <div class="content">
          <template v-for="user in checkedUserNodes" :key="user.id">
            <el-tag
              closable
              type="info"
              class="user-tag"
              @close="handleRemoveUser(user.id)"
            >
              <el-avatar>{{ user.name }}</el-avatar>
            </el-tag>
          </template>
        </div>
        <div class="footer">
          <el-button v-show="checkedUserNodes.length > 0" type="success"
            >完成</el-button
          >
          <el-button
            v-show="checkedUserNodes.length == 0"
            class="chat-primary-button"
            disabled
            >完成</el-button
          >
          <el-button class="chat-button" @click="handleClose">取消</el-button>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";

const defaultProps = { label: "name" };
let dialogVisibile = ref(false);
let userList = reactive([]); //用户列表
let checkedUserKeys = reactive([]); //勾选的用户key值
let checkedUserNodes = reactive([]); //勾选的用户节点
let treeRef = ref();

//关闭
const handleClose = () => {
  checkedUserKeys.length = 0;
  checkedUserNodes.length = 0;
  dialogVisibile.value = false;
};
//勾选或取消勾选用户
const handleCheck = (node, state) => {
  let isChecked = false; //当前节点是否选中
  let index = state.checkedKeys.findIndex((d) => d == node.id);
  if (index != -1) {
    isChecked = true;
  }
  checkedUserKeys.length = 0;
  checkedUserKeys.push(...state.checkedKeys); //记录当前选中的节点key值
  //根据isChecked值判断是记录还是去除
  if (isChecked) {
    checkedUserNodes.push(node);
  } else {
    let flag = checkedUserNodes.findIndex((d) => d.id == node.id);
    checkedUserNodes.splice(flag, 1);
  }
};
//移除勾选的用户
const handleRemoveUser = (userId) => {
  let index = checkedUserKeys.findIndex((d) => d == userId);
  checkedUserKeys.splice(index, 1);
  let flag = checkedUserNodes.findIndex((d) => d.id == userId);
  checkedUserNodes.splice(flag, 1);
  treeRef.value.setCheckedKeys(checkedUserKeys); //更新树默认选中节点
};
//展示弹窗页面
const showDialog = (data) => {
  dialogVisibile.value = true;
  userList.length = 0;
  userList.push(...data);
};

defineExpose({ showDialog });
</script>

<style lang="less">
.group-dialog {
  --header-height: 48px;
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
    height: 60vh;
  }
  .el-row {
    height: 100%;
    .el-col {
      padding: 10px;
      height: 100%;
    }
  }
  .header,
  .footer {
    height: var(--header-height);
    line-height: var(--header-height);
  }
  .user-col {
    border-right: 1px solid var(--el-border-color-light);
    .header {
      .el-input__wrapper {
        background-color: var(--el-color-info-light-8);
      }
    }
    .content {
      height: calc(100% - var(--header-height));
      overflow: auto;
    }
  }
  .choose-col {
    .content {
      height: calc(100% - 2 * var(--header-height));
      overflow: auto;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }
}
//用户列表
.user-tree {
  height: 100%;
  .el-tree-node__expand-icon.is-leaf {
    display: none;
  }
  .el-tree-node__content {
    height: auto !important;
    margin-bottom: 5px;
    .el-tree-node__label {
      width: 100%;
      .custom-tree-node {
        width: 100%;
        display: flex;
        align-items: center;
        .user-label {
          display: inline-block;
          width: calc(100% - 24px);
          padding-left: 5px;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: var(--el-color-success);
    border-color: var(--el-color-success);
  }
  .el-checkbox__inner:hover {
    border-color: var(--el-color-success);
  }
}
.user-tag {
  height: auto;
  justify-content: unset;
  align-items: unset;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 5px;
  .el-tag__close {
    margin-left: -6px;
    background-color: var(--el-color-info-light-8);
  }
}
</style>
