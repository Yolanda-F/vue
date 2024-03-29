<!-- 表单创建 -->

<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formDataRef"
    label-width="80"
    label-position="right"
  >
    <el-form-item
      v-for="column in currentColumn"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
    >
      <!-- input类型 -->
      <el-input
        v-if="['input', 'phone', 'mail'].includes(column.type)"
        v-model="formData[column.prop]"
        :disabled="column.disabled"
      />
      <!-- 密码类型 -->
      <el-input
        v-if="column.type == 'password'"
        v-model="formData[column.prop]"
        type="password"
        show-password
        :disabled="column.disabled"
      />
      <!-- textarea类型 -->
      <el-input
        v-if="column.type == 'textarea'"
        type="textarea"
        :rows="2"
        v-model="formData[column.prop]"
      />
      <!-- file类型 -->
      <el-upload
        v-if="column.type == 'file'"
        v-model:file-list="formData[column.prop]"
        drag
        multipl
        :auto-upload="false"
        :limit="5"
        class="upload"
      >
        <el-icon :size="32">
          <upload-filled />
        </el-icon>
      </el-upload>
      <!-- date类型 -->
      <el-date-picker
        v-if="column.type == 'date'"
        v-model="formData[column.prop]"
        type="datetime"
        :disabled="column.disabled"
      />
      <!-- select类型 -->
      <el-select
        v-if="column.type == 'select'"
        v-model="formData[column.prop]"
        placeholder="请选择"
      >
        <el-option
          v-for="item in column.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- radio类型 -->
      <el-radio-group
        v-if="column.type == 'radio'"
        v-model="formData[column.prop]"
      >
        <el-radio
          :label="item.label"
          v-for="item in column.options"
          :key="item.label"
          >{{ item.name }}</el-radio
        >
      </el-radio-group>
      <!-- inputNumber类型 -->
      <el-input-number
        v-if="column.type == 'number'"
        v-model="formData[column.prop]"
        :min="1"
        controls-position="right"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { onMounted, reactive, inject, ref, defineExpose } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

let columns = inject("columns"); //接收父组件传递的变量
let formData = inject("formData"); //接收父组件传递的变量
let currentColumn = reactive([]); //要展示的表单项（去除不需要展示的项）
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
    //电话格式
    if (column.type == "phone") {
      rules[column.prop].push({
        pattern: /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/,
        message: "手机号格式不正确",
      });
    }
    if (column.type == "mail") {
      rules[column.prop].push({
        pattern:
          /^[A-Za-z0-9-._]+@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,6})$/,
        message: "邮箱地址格式不正确",
      });
    }
  });
};

//清空表单
const handleReset = () => {
  formDataRef.value.resetFields();
};

onMounted(() => {
  currentColumn.length = 0;
  columns.forEach((column) => {
    //只留下需要展示的项
    if (column.isForm) {
      currentColumn.push(column);
    }
  });
  getRules();
});
defineExpose({ formDataRef, formData, handleReset, rules });
</script>

<style lang="less" scoped>
:deep(.upload) {
  width: 100%;
  .el-upload-dragger {
    padding: var(--el-upload-dragger-padding-vertical);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
:deep(.el-select) {
  width: 100%;
}
:deep(.el-date-editor) {
  --el-date-editor-width: 100%;
}
:deep(.el-input-number) {
  width: 100%;
  .el-input__inner {
    text-align: left;
  }
}
</style>
