<template>
  <div class="vp-tool">
    <div class="vp-tool-content" :class="{ active: show.menu }">
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
    <div class="vp-tool-content" :class="{ active: show.work }">
      <a
        class="vp-tool-btn"
        v-for="(item, index) in menu.work"
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
    <div class="vp-tool-content" :class="{ active: show.tools }">
      <a
        class="vp-tool-btn"
        v-for="(item, index) in menu.tools"
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
import { useStorage, useEventListener } from "@vueuse/core";
import DashiconsTranslation from "~icons/dashicons/translation";
import SimpleIconsBaidu from "~icons/simple-icons/baidu";
import LogosCodepenIcon from "~icons/logos/codepen-icon";
import MyMdn from "~icons/my-icons/mdn";
import TwemojiHighVoltage from "~icons/twemoji/high-voltage";
import LogosVueuse from "~icons/logos/vueuse";
import LogosElement from "~icons/logos/element";
import LogosVue from "~icons/logos/vue";
import LogosNpmIcon from "~icons/logos/npm-icon";
import LogosVitejs from "~icons/logos/vitejs";
import LogosBootstrap from "~icons/logos/bootstrap";
import LogosPartytownIcon from "~icons/logos/partytown-icon";
import LogosStylefmt from "~icons/logos/stylefmt";
import LogosGrav from "~icons/logos/grav";
import LogosParse from "~icons/logos/parse";
import LogosGoogleCloud from "~icons/logos/google-cloud";
import LogosChrome from "~icons/logos/chrome";
import LogosDeno from "~icons/logos/deno";
import TwemojiVideoGame from "~icons/twemoji/video-game";

let show = useStorage(
  "vp-tool",
  reactive({
    menu: false,
    work: false,
    tools: false,
  })
);
useEventListener(document, "keydown", (e) => {
  var keyCode = e.key || e.code;
  if (e.altKey && keyCode == 1) {
    show.value.work = false;
    show.value.tools = false;
    show.value.menu = !show.value.menu;
  }
  if (e.altKey && keyCode == 2) {
    show.value.menu = false;
    show.value.tools = false;
    show.value.work = !show.value.work;
  }
  if (e.altKey && keyCode == 3) {
    show.value.menu = false;
    show.value.work = false;
    show.value.tools = !show.value.tools;
  }
});
watch(show.value, (val) => {
  localStorage.setItem("vp-tool", JSON.stringify(val, null, 2));
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
    // {
    //   com: LogosVue,
    //   name: "vue3",
    //   link: "https://staging-cn.vuejs.org/",
    //   theme: "",
    // },
    {
      com: LogosVue,
      name: "vue2",
      link: "https://cn.vuejs.org/v2/guide/",
      theme: "",
    },
    {
      com: LogosNpmIcon,
      name: "npm",
      link: "https://www.npmjs.com/search?q=ts",
      theme: "",
    },
    {
      com: LogosVitejs,
      name: "vite",
      link: "https://cn.vitejs.dev/",
      theme: "",
    },
  ],
  work: [
    {
      com: LogosPartytownIcon,
      name: "icones",
      link: "https://icones.js.org/",
      theme: "",
    },
    {
      com: LogosVue,
      name: "vue3",
      link: "https://cn.vuejs.org/api/",
      theme: "",
    },
    {
      com: LogosParse,
      name: "tools.fun",
      link: "https://tools.fun/json.html",
      theme: "",
    },
    {
      com: LogosVitejs,
      name: "vuepress",
      link: "https://www.vuepress.cn/",
      theme: "",
    },
  ],
  tools: [
    {
      com: LogosBootstrap,
      name: "bootcss",
      link: "https://www.bootcss.com/",
      theme: "",
    },
    {
      com: LogosChrome,
      name: "浏览器插件",
      link: "https://www.crxfun.com/",
      theme: "",
    },
    {
      com: LogosDeno,
      name: "deno",
      link: "https://www.denojs.cn/",
      theme: "",
    },
    {
      com: TwemojiVideoGame,
      name: "游戏",
      link: "https://www.yikm.net/",
      theme: "",
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
      position: absolute;
      left: 50%;
      bottom: 0;
      margin: 0 auto;
      font-size: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 4px 12px -1px rgb(18 22 33 / 10%);
      transition: all 0.25s;
      transform: translate(-50%, calc(100% + 10px));
      &.active {
        transform: translate(-50%, 0);
      }
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
