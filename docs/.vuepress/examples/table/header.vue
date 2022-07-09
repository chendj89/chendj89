<template>
  <el-table :data="form.list" :total="form.total" size="small" :header-cell-style="form.style.header"
    :cell-style="form.style.cell" v-loading="loading">
    <el-table-column type="index" width="55px"></el-table-column>
    <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
    <el-table-column prop="date" label="日期" show-overflow-tooltip></el-table-column>
    <el-table-column label="城市" show-overflow-tooltip>
      <el-table-column prop="province" label="省份"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
const ins = getCurrentInstance();
const loading = ref(false);
const form = reactive({
  list: [],
  total: 0,
  style: {
    header: {
      textAlign: "center",
    },
    cell: {
      textAlign: "center"
    }
  }
});

onMounted(() => {
  ins.proxy.$http.post("/api/mock", {
    "list|2": [
      {
        name: "@first",
        date: "@date(yyyy-MM-dd)",
        province: "@province",
        city: "@city",
        "age|18-60": 100,
        "num|1-100": 100,
      },
    ],
    "total|10-200": 200,
  }).then(res => {
    if (res.code == 0) {
      form.list = res.data.list;
      form.total = res.data.total;
    }
  }).finally(() => {
    loading.value = false;
  });
});

</script>

<style lang="scss" scoped>
</style>