<script setup>
const props = defineProps(['icon', 'link', 'text'])
</script>

<template>
  <a :href="link" :title="text" target="_blank" rel="noreferrer noopener" class="social-link">
    <el-icon v-if="icon" :size="24">
      <component :is="icon" />
    </el-icon>
  </a>
</template>

<style scoped lang="scss">
.social-link {
  display: inline-block;
  line-height: 1.7;
  height: 24px;
  color: var(--text-color);
  margin-left: 10px;
}
</style>
