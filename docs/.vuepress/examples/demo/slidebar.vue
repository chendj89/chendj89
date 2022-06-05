<script lang="ts" setup>
defineEmits(['close'])
let sidebars = [
  {
    "text": "Basic 基础组件",
    "children": [
      {
        "link": "/button",
        "text": "Button 按钮"
      },
      {
        "link": "/border",
        "text": "Border 边框"
      },
      {
        "link": "/color",
        "text": "Color 色彩"
      },
      {
        "link": "/container",
        "text": "Container 布局容器"
      },
      {
        "link": "/icon",
        "text": "Icon 图标"
      },
      {
        "link": "/layout",
        "text": "Layout 布局"
      },
      {
        "link": "/link",
        "text": "Link 链接"
      },
      {
        "link": "/scrollbar",
        "text": "Scrollbar 滚动条"
      },
      {
        "link": "/space",
        "text": "Space 间距"
      },
      {
        "link": "/typography",
        "text": "Typography 排版"
      }
    ]
  }
]
</script>

<template>
  <aside :class="{ sidebar: true }">
    <slot name="top" />
    <div class="sidebar-groups">
      <section v-for="(item, key) of sidebars" :key="key" class="sidebar-group">
        <p class="sidebar-group__title">
          {{ item.text }}
        </p>
        <DemoSidebarlink v-for="(child, childKey) in item.children" :key="childKey" :item="child"
          @close="$emit('close')" />
      </section>
    </div>
    <slot name="bottom" />
  </aside>
</template>
