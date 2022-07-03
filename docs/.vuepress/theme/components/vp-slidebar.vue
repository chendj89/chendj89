<script setup>
import { reactive, getCurrentInstance, onMounted } from "vue";
import { getRoute } from "@docs/.vuepress/utils/route";
let sidebars = reactive({
  menu: []
});
onMounted(() => {
  let ins = getCurrentInstance();
  sidebars.menu = getRoute(ins);
});

</script>

<template>
  <aside :class="{ sidebar: true }">
    <slot name="top" />
    <div class="sidebar-groups">
      <section v-for="(item, key) of sidebars.menu" :key="key" class="sidebar-group">
        <p class="sidebar-group__title">
          {{ item.text }}
        </p>
        <vp-sidebarlink v-for="(child, childKey) in item.children" :key="childKey" :item="child"
          @close="$emit('close')" />
      </section>
    </div>
    <slot name="bottom" />
  </aside>
</template>
