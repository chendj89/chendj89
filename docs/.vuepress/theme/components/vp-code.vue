<template>
  <code class="vp-code">
    {{ runCode }}
  </code>
</template>

<script setup>
import { ref, onMounted, computed, defineProps, getCurrentInstance } from "vue";
const props = defineProps({
  code: String,
  cache: String,
});
const decodedCode = computed(() => decodeURIComponent(props.code || ""));
const decodedCache = computed(() => decodeURIComponent(props.cache || ""));
let runCode = computed(() => {
  let str=decodedCode.value;
  if (decodedCode.value) {
    if (decodedCache.value) {
      str = JSON.parse(decodedCache.value).join("") + "\n" + decodedCode.value;
    }
    console.log(str);
    return eval(str);
  }
  return "";
});
</script>

<style lang="scss" scoped></style>
