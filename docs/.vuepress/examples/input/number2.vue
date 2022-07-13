<template>
  <el-input
    v-model="form.input"
    @input="
      form.input = form.input
        .replace(/[^\d\.]/g, '')
        .replace(/^\./g, '')
        .replace(/\.{2}/, '.')
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
    "
  ></el-input>
</template>

<script setup>
import { reactive } from "vue";
const form = reactive({
  input: 0,
});
</script>

<style lang="scss" scoped></style>
