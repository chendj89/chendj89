<template>
  <Child v-bind="userInfo" v-on="userHandler"></Child>
</template>
<script setup>
import { reactive } from "vue";
import Child from "./child.vue";
const userInfo = reactive({
  name: "奥特曼",
  height: "180m",
  age: "1000",
  // ... 更多属性
});
const userHandler = {
  updateUserName(userName) {
    // userName
    console.log(userName);
  },
  updateUserHeight(userHeight) {
    // userHeight
    console.log(userHeight);
  },
  // ...接收更多子组件事件
};
</script>
