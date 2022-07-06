<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <Content ref="content" class="doc-content"></Content>
    </div>
    <vp-toc :key="ins.proxy.$route.fullPath"></vp-toc>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, getCurrentInstance } from "vue";
const ins = getCurrentInstance();
let showSlideBar = computed(() => {
  if (ins) {
    if (ins.proxy.$page.frontmatter) {
      if (ins.proxy.$page.frontmatter.sidebar !== undefined) {
        return ins.proxy.$page.frontmatter.sidebar
      }
    }
  }
  return true;
});
const hasHeader = computed(() => {
  return showSlideBar && ins && ins.proxy && ins.proxy.$page.headers
})
const content = ref(null)
function updateDom() {

}
let show = ref(false);
onMounted(() => {
  show.value = true;
});
</script>

<style scoped>
</style>