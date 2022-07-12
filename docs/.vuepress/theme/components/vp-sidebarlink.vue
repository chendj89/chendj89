<script setup>
import { getCurrentInstance, defineProps, defineEmits } from "vue";
let ins = getCurrentInstance();
function isActive(path) {
  const page = ins.proxy.$page;
  return page.regularPath == path.link;
}
defineEmits(['close'])
let props = defineProps(['item'])
</script>

<template>
  <router-link :class="{
    link: true,
    active: isActive(item),
    'flex items-center': item.promotion,
  }" :to="item.link" @click="$emit('close')">
    <p class="link-text" v-if="item.meta.en">{{ item.text }} {{item.meta.en}}</p>
    <p class="link-text" v-else>{{ item.text }}</p>
  </router-link>
</template>

<style scoped lang="scss">
.link:not(.flex) {
  display: block;
}

.link {
  padding: 10px 16px;
  line-height: 1.5;
  font-size: 0.9rem;
  border-radius: 8px;

  .link-text {
    margin: 0;
  }
}

.link:hover .link-text {
  color: var(--brand-color);
  transition: color 0.25s;
}

.link.active {
  background-color: var(--link-active-bg-color);

  .link-text {
    font-weight: 600;
    color: var(--brand-color);
    transition: color 0.25s;
  }
}

.link-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color-light);
  transition: color 0.5s;
}
</style>
