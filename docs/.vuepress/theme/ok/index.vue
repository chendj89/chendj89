<template>
  <div>
    <slot></slot>
    <div>{{msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg:"0🤡🤡🤡0"
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
