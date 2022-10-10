<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <span>这是一段信息{{ hero.name }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onUnmounted, onMounted } from "vue";
const props = defineProps({
   msg:String,
   from:String
});
const ins = getCurrentInstance();
const dialogVisible = ref(true);
const handleClose = (done) => {
  ins.proxy.$resolve({ msg: "弹窗" });
};
let hero = reactive({
  name: ins.proxy.$hero.format("嘻嘻"),
});
onMounted(() => {
   console.log(props);
});

onUnmounted(() => {
  console.log("销毁--basic");
});
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
