<template>
  <div>
    <slot></slot>
    <div>{{ msg }}</div>
    <div>{{ item1 }}</div>
    <div>{{ t1 }}</div>
    <div>{{ item2 }}</div>
    <div>{{ item3 }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "0🤡🤡🤡0",
      t1: "t1:" + this.item1,
    };
  },
  props: {
    item1: {
      type: String | Number,
      default: 1,
    },
    item2: {
      type: String | Number,
      default: 2,
    },
    item3: {
      type: String | Number,
      default: 3,
    },
  },
};
</script>

<style lang="scss" scoped></style>
