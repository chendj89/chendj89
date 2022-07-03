<template>
  <div>
    <el-popover placement="top" width="200" v-model="visible">
      <p>是否确定下载图片</p>
      <div style="text-align: right; margin: 0" :data-img="$withBase(img.src)">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="getImg($withBase(img.src))">确定</el-button>
      </div>
      <el-image slot="reference" style="width: 72px; height: 72px" :src="$withBase(img.src)" :fit="img.fit">
      </el-image>
    </el-popover>
  </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { downloadImage } from "@docs/.vuepress/utils/download";
let ins = getCurrentInstance();
const fit = ref('fill');
const img = reactive({
  src: "/assets/onepiece.jpg",
  fit: "fill"
});
const visible = ref(false);
function getImg(img) {
  downloadImage(img);
  visible.value = false;
}
</script>
<style lang="scss" scoped>
</style>