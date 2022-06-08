<script setup>
import { computed } from "vue";
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import { usePageData } from "@vuepress/client";
const page = usePageData();
const hasHeader = computed(() => {
  return page.value && page.value.headers
})
</script>

<template>
  <ParentLayout>
    <template #sidebar>
      <DemoSlidebar></DemoSlidebar>
    </template>
    <template #page>
      <main class="page-content has-sidebar">
        <div class="doc-content-wrapper">
          <div class="doc-content-container">
            <Content class="doc-content" />
          </div>
          <DemoToc v-if="hasHeader"></DemoToc>
        </div>
        <DemoFooter2></DemoFooter2>
      </main>
    </template>

  </ParentLayout>
</template>
