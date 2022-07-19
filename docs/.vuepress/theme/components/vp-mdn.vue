<template>
  <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object">
    <slot></slot>
    <LogosMdn></LogosMdn>
  </a>
</template>

<script setup>
import LogosMdn from '~icons/logos/mdn'
import { ref, defineProps } from "vue";
const props = defineProps(["size"]);
const style = ref({
  fontSize: props.size ? props.size + "px" : "16px",
});
</script>
