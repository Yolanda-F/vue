<!-- 上传文件 -->

<template>
  <el-dialog
    v-model="dialogVisibile"
    width="40%"
    title="上传文件"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
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
import { ref, defineExpose, provide } from "vue";
import { TableColumns } from "@/utill/file";
import FormCreate from "@/components/FormCreate.vue";

let dialogVisibile = ref(false);
let formRef = ref();

//关闭弹窗
const handleClose = () => {
  formRef.value.handleReset(); //重置表单
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
provide("columns", TableColumns); //提供给子组件
</script>
