<template>
  <div @click="click">使用对话框</div>
</template>

<script setup>
import Basic from "./basic.vue";
import func from "./func.vue";
import { useDialog } from "@docs/.vuepress/utils/useDialog";
const click=()=>{
  useDialog(func,{});
}
</script>

<style lang="scss" scoped></style>
