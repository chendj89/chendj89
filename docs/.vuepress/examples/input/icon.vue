<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input.input"
      >
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="input.icon">
        <i slot="prefix" class="el-icon-search el-input__icon" @click="handle('前置图标')"></i>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="input.icon">
        <i slot="suffix" class="el-icon-search el-input__icon" @click="handle('后置图标')"></i>
      </el-input>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
const ins = getCurrentInstance();
const input = reactive({
  input: "",
  icon: "",
});
const handle = (msg = "无消息") => {
  ins.proxy.$message({
    message: msg,
    type: "success",
  });
};
</script>

<style lang="scss" scoped></style>
