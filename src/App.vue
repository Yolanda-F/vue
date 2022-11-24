<template>
  <router-view />
</template>

<script setup>
import { useStore } from "@/store/index";

const store = useStore();
</script>
