<template>
  <div class="vp-container">
    <vp-demo v-if="show" v-bind="props"></vp-demo>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, getCurrentInstance } from "vue";
const props = defineProps({
  source: String,
  path: String,
  description: String,
  origin:String,
});
let ins = getCurrentInstance();
const show = ref(false);
onMounted(() => {
  show.value = true;
})
</script>


<style scoped>
</style>

