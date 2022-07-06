<template>
  <el-form label-width="100px">
    <el-form-item label="下载">
      <el-input v-model="form.url" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="download">下载</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, computed } from "vue";
import { downloadLink } from "@docs/.vuepress/utils/download"
const form = reactive({
  url: "",
  download: computed(() => {
    return "https://mirror.ghproxy.com/" + form.url;
  })
});
const download = (url) => {
  if (form.download) {
    downloadLink(form.download);
  }
};
</script>

<style lang="scss" scoped>
</style>