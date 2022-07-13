<template>
  <code class="vp-code">
    {{ runCode }}
  </code>
</template>

<script setup>
import { ref, onMounted, computed, defineProps, getCurrentInstance } from "vue";
const props = defineProps({
  code: String
});
const decodedCode = computed(() =>
  decodeURIComponent(props.code || "")
);
let runCode = computed(() => {
  if (decodedCode.value) {
    return eval(decodedCode.value)
  }
  return ""
});

</script>

<style lang="scss" scoped>
</style>