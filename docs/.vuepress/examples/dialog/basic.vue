<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    :destroy-on-close="true"
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onUnmounted } from "vue";
const ins = getCurrentInstance();
const dialogVisible = ref(true);
const handleClose = (done) => {
  ins.proxy.$resolve();
};
onUnmounted(() => {
  console.log("销毁--basic");
});
</script>

<style lang="scss" scoped></style>
