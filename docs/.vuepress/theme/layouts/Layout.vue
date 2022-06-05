<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page-content has-sidebar">
        <div class="doc-content-wrapper">
          <div class="doc-content-container">
            <Content class="doc-content" />
          </div>
        </div>
      </main>
    </template>
    <template #page-bottom>
      <div class="my-footer">eee</div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.my-footer {
  text-align: center;
}
</style>