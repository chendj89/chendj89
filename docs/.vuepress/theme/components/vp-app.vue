<template>
  <div class="app">
    <vp-nav></vp-nav>
    <template v-if="showSlideBar">
      <vp-slidebar></vp-slidebar>
      <vp-content class="has-sidebar"></vp-content>
    </template>
    <template v-else>
      <div style="padding-top: var(--nav-height)">
        <div style="padding: 0 50px; max-width: 1200px; margin: 0 auto">
          <Content></Content>
        </div>
      </div>
    </template>
    <vp-tool v-if="loaded"></vp-tool>
  </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onMounted } from "vue";
let ins = getCurrentInstance();
let showSlideBar = computed(() => {
  return ins.proxy.$route.fullPath !== "/";
});
let loaded = ref(false);
onMounted(() => {
  loaded.value = true;
});
</script>

<style lang="scss" scoped></style>
