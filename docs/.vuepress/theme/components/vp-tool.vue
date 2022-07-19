<template>
  <div class="vp-tool">
    <div class="vp-tool-content">
      <a
        class="vp-tool-btn"
        v-for="(item, index) in menu.list"
        :key="index"
        :href="item.link"
        target="_blank"
      >
        <component
          class="vp-tool-icon"
          :style="{ color: item.theme }"
          :is="item.com"
        ></component>
      </a>
    </div>
  </div>
</template>

<script setup>

import DashiconsTranslation from "~icons/dashicons/translation";
import SimpleIconsBaidu from "~icons/simple-icons/baidu";
import LogosCodepenIcon from "~icons/logos/codepen-icon";
import LogosVueuse from "~icons/logos/vueuse";
import { reactive,watch } from "vue";

const menu = reactive({
  list: [
    {
      com: DashiconsTranslation,
      name: "翻译",
      link: "https://fanyi.youdao.com/",
      theme: "#329672",
    },
    {
      com: LogosVueuse,
      name: "VueUse",
      link: "https://vueuse.org/functions.html",
      theme: "",
    },
    {
      com: SimpleIconsBaidu,
      name: "baidu",
      link: "https://www.baidu.com/",
      theme: "#2932e1",
    },
  ],
});

</script>

<style lang="scss" scoped>
$shadow-opacity: 0.3;
$tl: #329672;
.vp {
  &-tool {
    position: fixed;
    left: 0;
    bottom: 10px;
    width: 100%;
    z-index: 999;
    text-align: center;
    &-content {
      margin: 0 auto;
      background: #fff;
      border-radius: 8px;
      font-size: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 15px;
      box-shadow: var(--el-box-shadow-lighter);
    }
    &-btn {
      margin: 0 15px;
      cursor: pointer;
    }
    &-icon {
    }
  }
}
</style>
