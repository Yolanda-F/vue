<template>
  <el-dialog
    v-model="dialogVisibile"
    :title="title"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
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
import { ref, provide, defineExpose } from "vue";
import FormCreate from "@/components/FormCreate.vue";
import { userTableData } from "@/utill/user";

let dialogVisibile = ref(false);
let title = ref("");
let formRef = ref();

//表单项
const handleClose = () => {
  dialogVisibile.value = false;
};
//表单的提交方法
const handleSubmit = () => {
  formRef.value.formDataRef.validate((valid) => {
    if (valid) {
      console.log(formRef.value.formData);
    } else {
      return false;
    }
  });
};
defineExpose({ dialogVisibile, title });
provide("columns", userTableData); //提供给子组件
</script>
<style scoped lang="less">
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
