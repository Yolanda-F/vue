<template>
  <div>{{ store.count }}</div>
</template>

<script setup>
import { useStore } from "@/store/index";

const store = useStore();
</script>
