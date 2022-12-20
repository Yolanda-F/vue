<!-- 面包屑组件 -->

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in store.menuBread" :key="item">{{
      findMenuNameByIndex(MenuItems, item)
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useStore } from "@/store/index";
import { MenuItems } from "@/utill/menu";

const store = useStore();

//根据索引值寻找对应的菜单项名称
const findMenuNameByIndex = (data, index) => {
  for (let i = 0; i < data.length; i++) {
    let key = data[i].index;
    if (key == index) {
      return data[i].label;
    }
    //有子项
    if (data[i].children) {
      let label = findMenuNameByIndex(data[i].children, index);
      if (label) {
        return label;
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
