<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
// import http from "http";
import { onMounted, getCurrentInstance } from "vue";
const ins = getCurrentInstance();
onMounted(() => {
  // console.log(http);
})
</script>

<style lang="scss" scoped>
</style>