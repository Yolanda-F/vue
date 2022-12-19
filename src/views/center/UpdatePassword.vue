<!-- 修改密码 -->

<template>
  <el-dialog
    v-model="dialogVisibile"
    title="修改密码"
    width="30%"
    class="password-dialog"
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
import { ref, defineExpose, provide, reactive } from "vue";
import FormCreate from "@/components/FormCreate.vue";

let dialogVisibile = ref(false);
const columns = reactive([
  {
    prop: "oldPassword",
    label: "旧密码",
    type: "password",
    isForm: true,
    required: true,
    disabled: false,
  },
  {
    prop: "newPassword",
    label: "新密码",
    type: "password",
    isForm: true,
    required: true,
    disabled: false,
  },
  {
    prop: "confirmPassword",
    label: "确认密码",
    type: "password",
    isForm: true,
    required: true,
    disabled: false,
  },
]);
let formData = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
let formRef = ref();

//关闭
const handleClose = () => {
  dialogVisibile.value = false;
};
//表单的提交方法
const handleSubmit = () => {
  formRef.value.rules["confirmPassword"].push({
    validator(rule, value, callback) {
      if (value != formRef.value.formData["newPassword"]) {
        callback("两次密码输入不一致");
      } else {
        callback();
      }
    },
  });
  formRef.value.formDataRef.validate((valid) => {
    if (valid) {
      console.log(formRef.value.formData);
    } else {
      return false;
    }
  });
};

defineExpose({ dialogVisibile });
provide("columns", columns); //提供给子组件
provide("formData", formData);
</script>

<style lang="less" scoped></style>
