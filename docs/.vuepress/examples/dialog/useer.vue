<template>
  <div>
    <el-link type="primary" @click="click">基础弹窗</el-link>
    <el-link type="primary" @click="click3">基础func</el-link>
    <el-link type="primary" @click="click2">加强弹窗</el-link>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import basic from "./basic.vue";
import extend from "./extend.vue";
import func from "./func.vue";
import { useDialog } from "@docs/.vuepress/utils/useDialog";
const click = function () {
  useDialog(basic, {
    msg: "乞丐版",
    from: "basic",
  }).then((res) => {});
};
const click2 = function () {
  useDialog(extend, {
    msg: "飞翔的鱼",
  }).then((res) => {});
};
const click3 = function () {
  useDialog(extend, {
    msg: "u1s1",
  }).then((res) => {});
};
</script>

<style lang="scss" scoped></style>
