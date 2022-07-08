<template>
  <div>
    <el-form>
      <el-table ref="mainTable" :data="table.list" border tooltip-effect="dark" style="width: 100%" size="small"
        :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }" row-key="id"
        highlight-current-row v-loading="loading">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="date" label="日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="age" label="年纪" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-form-item label-width="0">
              <el-input size="mini" v-model="scope.row.age"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="年薪" show-overflow-tooltip></el-table-column>
        <el-table-column prop="city" label="城市" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
const ins = getCurrentInstance();
const mainTable = ref(null);
const loading = ref(true)
const table = reactive({
  list: [],
  total: 0
});
ins.proxy.$http.get("/api/mock", {
  "list|5": [
    {
      name: "@cname",
      date: "@date(yyyy-MM-dd)",
      city: "@city(true)",
      "age|18-60": 100,
      "num|1-100": 100,
    },
  ],
  "total|10-200": 200,
}).then(res => {
  table.list = res.data.list;
  table.total = res.data.total;
  loading.value = false;
  console.log(table);
})
</script>

<style lang="scss" scoped>
</style>