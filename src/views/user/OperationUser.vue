<template>
  <el-dialog
    v-model="store.userDialogVisible"
    :title="store.userDialogTips"
    width="30%"
    :before-close="handleClose"
  >
    <FormCreate ref="formRef"></FormCreate>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref, provide, onMounted } from "vue";
import FormCreate from "@/components/FormCreate.vue";
import { userTableData } from "@/utill/user";
import { useStore } from "@/store/index";

const store = useStore();

let formRef = ref();
//表单项
const currentForm = reactive([]);
const handleClose = () => {
  store.userDialogVisible = false;
};
//表单的提交方法
const handleSubmit = () => {
  console.log(formRef);
};
provide("columns", currentForm); //提供给子组件
onMounted(() => {
  currentForm.length = 0;
  userTableData.forEach((column) => {
    //只留下需要展示的项
    if (column.isForm) {
      currentForm.push(column);
    }
  });
});
</script>
<style scoped lang="less">
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
