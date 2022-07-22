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
const decodedCache = computed(() => decodeURIComponent(props.cache || "[]"));
const cacheArr = JSON.parse(decodedCache.value);

let runCode = computed(() => {
  let evalStr = decodedCode.value;
  cacheArr.map((item) => {
    if (decodedCode.value.includes(item.name)) {
      evalStr = item.func + "\n" + evalStr;
    }
  });
  console.log(cacheArr);
  console.log(evalStr);
  return eval(evalStr);
});
</script>

<style lang="scss" scoped></style>
