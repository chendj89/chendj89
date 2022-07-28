<template>
  <div @click="click">使用对话框</div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import Basic from "./basic.vue";
import func from "./func.vue";
import { useDialog } from "@docs/.vuepress/utils/useDialog";
let ins = getCurrentInstance();
let p1 = getCurrentInstance();
console.log(p1);
const click = function () {
  useDialog(Basic, {
    _____________game: "-----",
    ins,
  }).then((res) => {});
};
</script>

<style lang="scss" scoped></style>
