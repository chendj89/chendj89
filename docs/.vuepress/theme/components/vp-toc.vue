<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
import { useActiveSidebarLinks } from "@docs/.vuepress/utils/active-bar";
import { useToc } from '@docs/.vuepress/utils/use-toc';
let ins = getCurrentInstance();
const marker = ref()
const container = ref()
let headers = ref([]);
useActiveSidebarLinks(container, marker)
onMounted(() => {
  headers.value = useToc(ins.proxy)
});


</script>

<template>
  <aside ref="container" class="toc-wrapper">
    <nav class="toc-content">
      <h3 class="toc-content__heading">内容</h3>
      <ul class="toc-items">
        <li v-for="{ link, text, children } in headers" :key="link" class="toc-item">
          <a class="toc-link" :href="link" :title="text">{{ text }}</a>
          <ul v-if="children">
            <li v-for="{ link: childLink, text: childText } in children" :key="childLink" class="toc-item">
              <a class="toc-link subitem" :href="childLink" :title="text">{{
                  childText
              }}</a>
            </li>
          </ul>
        </li>
      </ul>
      <div ref="marker" class="toc-marker" />
    </nav>
  </aside>
</template>

