<template>
  <div>
    <div>
      <div>原始数据：{{ form.list }}</div>
      <div>过滤数据：{{ filter.list }}</div>
    </div>
    <div>
      <div>原始数据：{{ form.listObj }}</div>
      <div>过滤数据：{{ filter.listObj }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  list: [1, 2, 3, 4, 5],
  listObj: [
    { label: "a", value: 1 },
    { label: "b", value: 2 },
    { label: "c", value: 3 },
  ],
});
const filter = reactive({
  list: form.list.filter((item) => item !== 2),
  listObj: form.listObj.filter((item) => item.value !== 2),
});
</script>

<style lang="scss" scoped></style>
