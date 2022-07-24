<template>
  <div>
    <el-form label-width="100px" size="mini">
      <el-form-item label="文字颜色：">
        <el-row>
          <el-col :span="4" v-for="(item, index) in theme.color" :key="index">
            <div
              class="el-link"
              :class="'el-link--' + item.cls"
              @click="
                $message({
                  message: 'el-link--' + item.cls,
                  type: item.cls,
                })
              "
            >
              {{ item.text }}
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="背景颜色：">
        <el-row>
          <el-col :span="4" v-for="(item, index) in theme.color" :key="index">
            <div
              class="el-button el-button--mini"
              :class="'el-button--' + item.cls"
              @click="
                $message({
                  message: 'el-button--' + item.cls,
                  type: item.cls,
                })
              "
            >
              {{ item.text }}
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-table size="mini" :data="theme.color" border>
        <el-table-column prop="cls" label="代码">
          <template slot-scope="scope">
            <div class="el-link" :class="'el-link--' + scope.row.cls">
              {{ scope.row.cls }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="text" label="描述"></el-table-column>
        <el-table-column prop="cls" label="文字">
          <template slot-scope="scope">
            <div>el-link--{{ scope.row.cls }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="cls" label="背景">
          <template slot-scope="scope">el-button--{{ scope.row.cls }}</template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useClipboard } from "@vueuse/core";
import IRiFileCopyLine from "~icons/ri/file-copy-line";
const theme = reactive({
  color: [
    {
      cls: "default",
      text: "默认链接",
    },
    {
      cls: "primary",
      text: "主要链接",
    },
    {
      cls: "success",
      text: "成功链接",
    },
    {
      cls: "warning",
      text: "警告链接",
    },
    {
      cls: "danger",
      text: "危险链接",
    },
    {
      cls: "info",
      text: "信息链接",
    },
  ],
});
const handle = {
  copy() {},
};
</script>

<style scoped></style>
