<template>
  <div class="app">
    <vp-nav></vp-nav>
    <template v-if="showSlideBar">
      <vp-slidebar></vp-slidebar>
      <vp-content class="has-sidebar"></vp-content>
    </template>
    <template v-else>
      <div style="padding-top: var(--nav-height);">
        <Content></Content>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onMounted } from "vue";
let ins = getCurrentInstance();
let showSlideBar = computed(() => {
  return ins.proxy.$route.fullPath !== "/"
});
</script>

<style lang="scss" scoped>
</style>