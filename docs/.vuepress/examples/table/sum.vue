<template>
  <el-table
    :data="form.list"
    :total="form.total"
    size="small"
    :header-cell-style="form.style.header"
    :cell-style="form.style.cell"
    v-loading="loading"
    :row-key="'id'"
    :span-method="mySpan"
    show-summary
    :summary-method="mySum()"
  >
    <el-table-column type="selection" width="55px"></el-table-column>
    <el-table-column
      prop="unit"
      label="单位"
      show-overflow-tooltip
      width="60px"
    ></el-table-column>
    <el-table-column
      prop="num"
      label="天数"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="age"
      label="年纪"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      show-overflow-tooltip
      width="100px"
    ></el-table-column>
    <el-table-column prop="avatar" label="头像" width="80px">
      <template slot-scope="scope">
        <div style="font-size: 24px">
          {{ scope.row.avatar }}
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      show-overflow-tooltip
      width="120px"
    ></el-table-column>

    <el-table-column
      prop="color"
      label="颜色"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="star"
      label="幸运"
      show-overflow-tooltip
      width="100px"
      fixed="right"
    ></el-table-column>
    <el-table-column
      label="城市"
      show-overflow-tooltip
      fixed="right"
      width="200px"
    >
      <el-table-column
        prop="province"
        label="省份"
        width="100px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="city"
        label="城市"
        width="100px"
        show-overflow-tooltip
      ></el-table-column>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      show-overflow-tooltip
      fixed="right"
    ></el-table-column>
  </el-table>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { mixin_tableSummary } from "@docs/.vuepress/utils/table";
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
      textAlign: "center",
    },
  },
  sort: [],
});
const groupByName = (arr, name) => {
  let groups = {};
  arr.forEach((item) => {
    let index = item[name];
    groups[index] = groups[index] || [];
    groups[index].push(item);
  });
  let list = [];
  Object.values(groups).map((item) => {
    list = list.concat(item);
  });
  let sort = [];
  let pos = 0;
  list.forEach((item, index) => {
    if (index == 0) {
      sort.push(1);
      pos = 0;
    } else {
      if (list[index][name] == list[index - 1][name]) {
        sort[pos] += 1;
        sort.push(0);
      } else {
        sort.push(1);
        pos = index;
      }
    }
  });
  return { list, sort };
};

const mySum = (param) => {
  return mixin_tableSummary({
    arr: [1, 2, 3],
    rowProperty: ["unit", "date"],
    spanArr: form.sort,
    total: {
      index: 0,
      name: "统计",
    },
  });
};
const mySpan = ({ row, column, rowIndex, columnIndex }) => {
  if (form.sort.length) {
    if (columnIndex && columnIndex <= 2) {
      const _row = form.sort[rowIndex];
      const _col = _row > 0 ? 1 : 0;
      return {
        rowspan: _row,
        colspan: _col,
      };
    }
  }
};

onMounted(() => {
  ins.proxy.$http
    .post("/api/mock", {
      "list|5": [
        {
          id: "@natural()",
          unit: "@natural(1, 8)",
          name: "@first",
          date: "@date(yyyy-MM-dd)",
          province: "@province",
          city: "@city",
          "star|1-5": "@emoji",
          "age|2-8": 100,
          "num|1-6": 100,
          remark: "@csentence(5, 10)",
          color: "@hex",
          avatar: "@emoji",
        },
      ],
      "total|10-200": 200,
    })
    .then((res) => {
      if (res.code == 0) {
        form.list = res.data.list;
        form.total = res.data.total;
        let { list, sort } = groupByName(form.list, "unit");
        form.list = list;
        form.sort = sort;
      }
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style lang="scss" scoped></style>
