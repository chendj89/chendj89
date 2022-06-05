<script setup lang="ts">
import { ref } from 'vue'
import { useActiveSidebarLinks } from "../../utils/active-bar";
import { useToc } from '../../utils/use-toc'
const marker = ref()
const container = ref()
const headers = useToc()
useActiveSidebarLinks(container, marker)
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

