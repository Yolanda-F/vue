<!-- 登录页面 -->
<template>
  <el-container class="login-container">
    <div class="login-div">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="0"
        hide-required-asterisk
      >
        <el-form-item>
          <span class="login-title">{{ title }}</span>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input v-model="form.userName" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="form.passWord"
            type="password"
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="handleLoginIn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import { useStore } from "@/store/index";

const store = useStore();
const title = "xxx系统";
const router = useRouter();
const formRef = ref();
const form = reactive({
  userName: "admin",
  passWord: "123",
});
const rules = reactive({
  userName: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "change",
    },
  ],
  passWord: [
    {
      required: true,
      message: "请输入密码",
      trigger: "change",
    },
  ],
});
//登录
const handleLoginIn = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      store.userName = form.userName; //记录用户名
      router.push("/main");
    } else {
      return false;
    }
  });
};

//回车登录
onMounted(() => {
  document.onkeydown = (e) => {
    if (e.defaultPrevented) {
      return;
    }
    if (e.keyCode === 13 && e.target.baseURI.endsWith("/#/")) {
      handleLoginIn();
    }
  };
});
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  width: 100%;
  background: url("@/assets/bg1.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-div {
    width: 300px;
    background-color: #fff;
    padding: 10px;

    .login-title {
      display: inline-block;
      margin: auto;
    }

    .login-button {
      width: 100%;
    }
  }
}
</style>
