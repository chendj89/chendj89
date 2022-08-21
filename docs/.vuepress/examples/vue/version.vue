<template>
  <div>
    <div v-for="(attr, value) in version" :key="attr">
      {{ attr }}：{{ value }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
let ins = getCurrentInstance();
let version = reactive({
  vue: ins.proxy.$root.$options._base.version,
});
</script>

<style lang="scss" scoped></style>
