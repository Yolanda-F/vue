<!-- 创建角色 -->

<template>
  <el-dialog
    v-model="dialogVisibile"
    width="40%"
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    draggable
    :before-close="handleClose"
  >
    <!-- 创建表单 -->
    <FormCreate ref="formRef"></FormCreate>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, provide, inject } from "vue";
import { roleTableData } from "@/utill/role";
import FormCreate from "@/components/FormCreate.vue";

let dialogVisibile = ref(false);
let formRef = ref();
let title = inject("title"); //接收父组件传递的变量

//关闭弹窗
const handleClose = () => {
  dialogVisibile.value = false;
};
//确认
const handleSubmit = () => {
  formRef.value.formDataRef.validate((valid) => {
    if (valid) {
      console.log(formRef.value.formData);
    } else {
      return false;
    }
  });
};
defineExpose({ dialogVisibile });
provide("columns", roleTableData); //提供给子组件
</script>
