<template>
  <div>
    <el-radio-group v-model="radio" size="small" @change="change">
      <el-radio-button v-for="(item, index) in citys" :key="index" :label="item">
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup>
import { ref } from "vue";
const radio = ref("上海");
const citys = ["上海", "北京", "广州", "深圳"];
const change = () => {
};
</script>

<style lang="scss" scoped>
</style>
