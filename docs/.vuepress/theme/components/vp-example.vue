<script setup>
import { defineProps } from "vue";
defineProps({
  file: {
    type: String,
    required: true,
  },

})
</script>

<template>
  <div class="example-showcase">
    <ClientOnly>
      <component :is="file" v-bind="$attrs" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  background-color: var(--bg-color);
}
</style>
