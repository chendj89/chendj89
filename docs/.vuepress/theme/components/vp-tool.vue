<template>
  <div class="vp-tool" :class="{ active: show }">
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
          :style="{ color: item.theme || null }"
          :is="item.com"
        ></component>
      </a>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";
import { useLocalStorage, useStorage, useEventListener } from "@vueuse/core";
import DashiconsTranslation from "~icons/dashicons/translation";
import SimpleIconsBaidu from "~icons/simple-icons/baidu";
import LogosCodepenIcon from "~icons/logos/codepen-icon";
import MyMdn from "~icons/my-icons/mdn";
import TwemojiHighVoltage from "~icons/twemoji/high-voltage";
import LogosVueuse from "~icons/logos/vueuse";
import LogosElement from "~icons/logos/element";
import LogosVue from "~icons/logos/vue";

let show = useLocalStorage("vp-tool", false);

useEventListener(document, "keydown", (e) => {
  var keyCode = e.key || e.code;
  if (e.altKey && keyCode == 1) {
    show.value = !show.value;
  }
});
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
    {
      com: MyMdn,
      name: "mdn",
      link: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript",
      theme: "#2932e1",
    },
    {
      com: LogosElement,
      name: "饿了么",
      link: "https://element.eleme.cn/#/zh-CN/component/installation",
      theme: "",
    },
    {
      com: LogosVue,
      name: "vue3",
      link: "https://staging-cn.vuejs.org/",
      theme: "",
    },
    {
      com: TwemojiHighVoltage,
      name: "stackblitz",
      link: "https://stackblitz.com/",
      theme: "#1389fd",
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
    transition: all 0.25s;
    transform: translateY(calc(100% + 10px));

    &.active {
      transform: translateY(0);
    }

    &-content {
      margin: 0 auto;
      font-size: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 4px 12px -1px rgb(18 22 33 / 10%);
    }

    &-btn {
      display: inline-flex;
      margin: 0 10px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }

    &-icon {
    }
  }
}
</style>
