<template>
  <el-input v-model.number="form.input"></el-input>
</template>

<script setup>
import { reactive } from "vue";
const form = reactive({
  input: "",
});
</script>

<style lang="scss" scoped></style>
