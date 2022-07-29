<template>
  <div @click="show">
    3232
  </div>
</template>

<script>
import Basic from "./basic.vue";
import { useDialog,useName } from "@docs/.vuepress/utils/useDialog";
function useVer(){
  console.log(this);
}
export default {
  data() {
    return {};
  },
  methods:{
    show(){
      useName();
      useDialog(Basic,{})
    }
  }
};
</script>

<style lang="scss" scoped></style>
