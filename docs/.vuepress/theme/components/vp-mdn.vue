<template>
  <a target="_blank" :href="href">
    <span style="margin-right: 10px"><slot></slot></span>
    <MyMdn></MyMdn>
  </a>
</template>

<script setup>
import MyMdn from "~icons/my-icons/mdn";
import { ref, defineProps } from "vue";
const props = defineProps(["size", "href"]);
const href = ref(
  props.href
    ? props.href
    : "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript"
);
</script>
