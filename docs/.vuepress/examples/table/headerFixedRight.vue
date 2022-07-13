<template>
  <el-table :data="form.list" :total="form.total" size="small" :header-cell-style="form.style.header"
    :cell-style="form.style.cell" v-loading="loading">
    <el-table-column type="index" width="55px"></el-table-column>
    <el-table-column prop="name" label="姓名" show-overflow-tooltip width="100px"></el-table-column>
    <el-table-column prop="avatar" label="头像" width="80px">
      <template slot-scope="scope">
        <el-image style="width:30px;height:30px;font-size:28px;" :src="scope.row.avatar" fill="fill"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="日期" show-overflow-tooltip width="120px"></el-table-column>
    <el-table-column prop="age" label="年纪" show-overflow-tooltip></el-table-column>
    <el-table-column prop="num" label="天数" show-overflow-tooltip></el-table-column>
    <el-table-column prop="color" label="颜色" show-overflow-tooltip></el-table-column>
    <el-table-column prop="star" label="幸运" show-overflow-tooltip width="100px" fixed="right"></el-table-column>
    <el-table-column label="城市" show-overflow-tooltip fixed="right" width="200px">
      <el-table-column prop="province" label="省份" width="100px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="city" label="城市" width="100px" show-overflow-tooltip></el-table-column>
    </el-table-column>
    <el-table-column prop="remark" label="备注" show-overflow-tooltip fixed="right"></el-table-column>
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
    "list|5": [
      {
        name: "@first",
        date: "@date(yyyy-MM-dd)",
        province: "@province",
        city: "@city",
        "star|1-4": "@emoji",
        "age|18-60": 100,
        "num|1-100": 100,
        "remark": "@csentence(5, 10)",
        "color": "@hex",
        "avatar": "@image('60x60','@hex','#fff','png','@cname')"
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