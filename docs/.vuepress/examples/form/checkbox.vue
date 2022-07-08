<template>
  <div>
    <el-checkbox v-for="(item, index) in form" :key="index" :indeterminate="item.indeterminate" v-model="item.value">{{
        item.label
    }}</el-checkbox>
  </div>
</template>

<script setup>
import { ref } from "vue";
const form = ref([
  {
    value: true,
    indeterminate: false,
    label: "全选中"
  },
  {
    value: false,
    indeterminate: true,
    label: "半选中"
  }, {
    value: false,
    indeterminate: false,
    label: "未选中"
  }
]);
</script>

<style lang="scss" scoped>
</style>