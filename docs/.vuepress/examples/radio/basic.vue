<template>
  <div>
    <el-radio-group v-model="radio" size="small" fill="#409EFF">
      <el-radio-button
        v-for="(item, index) in citys"
        :key="index"
        :label="item"
      ></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup>
import { ref } from "vue";
const radio = ref("上海");
const citys = ["上海", "北京", "广州", "深圳"];
</script>

<style lang="scss" scoped></style>
