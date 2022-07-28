<template>
  <div>
    <el-button type="success" @click="close">我是表格</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      this.$resolve({ msg: "我是表格" });
    },
  },
  destroyed(){
    console.log('销毁表格');
  }
};
</script>

<style lang="scss" scoped></style>
