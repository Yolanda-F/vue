<!-- 表单创建 -->

<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formDataRef"
    label-width="100"
    label-position="right"
  >
    <el-form-item
      v-for="column in currentColumn"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
    >
      <el-input
        v-if="column.type == 'input'"
        v-model="formData[column.prop]"
        :disabled="column.disabled"
      />
      <el-input
        v-if="column.type == 'textarea'"
        type="textarea"
        :rows="2"
        v-model="formData[column.prop]"
      />
      <el-upload v-if="column.type == 'file'" drag multiple class="upload">
        <el-icon :size="32">
          <upload-filled />
        </el-icon>
        <!-- <template #tip>
          <div class="el_upload_tip"></div>
        </template> -->
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, inject, ref, defineExpose } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

let columns = inject("columns"); //接收父组件传递的变量
let currentColumn = reactive([]); //要展示的表单项（去除不需要展示的项）
let formData = reactive({});
let rules = reactive([]);
let formDataRef = ref();

//动态获取校验规则
const getRules = () => {
  rules.length = 0;
  currentColumn.forEach((column) => {
    rules[column.prop] = [];
    //对于必填项
    if (column.required) {
      rules[column.prop].push({
        required: true,
        message: `${column.label}不可为空`,
        trigger: "change",
      });
    }
  });
};

onMounted(() => {
  currentColumn.length = 0;
  formData = {};
  columns.forEach((column) => {
    //只留下需要展示的项
    if (column.isForm) {
      currentColumn.push(column);
    }
    formData[column.prop] = column.defaultValue;
  });
  getRules();
});
defineExpose({ formDataRef, formData });
</script>

<style lang="less" scoped>
.upload {
  width: 100%;
}
</style>