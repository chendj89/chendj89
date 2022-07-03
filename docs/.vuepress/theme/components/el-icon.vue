<template>
  <i class="el-icon" :style="style">
    <slot></slot>
  </i>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["size"]);
const style = ref({
  fontSize: props.size ? props.size + 'px' : '16px'
});

</script>
