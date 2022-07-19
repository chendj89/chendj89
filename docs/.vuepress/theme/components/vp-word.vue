<template>
  <div class="vp-word">
    <slot></slot>
    <code class="vp-word-content" :class="{ active: word.active }">
      <div class="vp-word-soundmark">{{ word.soundmark }}</div>
      <audio ref="audio" class="vp-word-audio" controls>
        <source :src="word.src" />
      </audio>
      <CarbonMicrophoneFilled
        class="vp-word-icon"
        @click.native="play"
      ></CarbonMicrophoneFilled>
    </code>
  </div>
</template>

<script setup>
// import http from "http";
import CarbonMicrophoneFilled from "~icons/carbon/microphone-filled";

import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue";
import { useEventListener } from "@vueuse/core";
const ins = getCurrentInstance();
const audio = ref(null);
let word = reactive({
  name: ins.proxy.$slots.default[0].text,
  soundmark: "",
  src: "",
  allow: true,
  active: false,
});

onMounted(() => {
  if (ins.proxy.$themeConfig) {
    if (ins.proxy.$themeConfig.words) {
      let words = Object.values(ins.proxy.$themeConfig.words);
      words.filter((item) => {
        if (item.name == word.name) {
          word.soundmark = item.soundmark;
          word.src = item.src;
        }
      });
    }
  }
});
useEventListener(audio, "ended", (evt) => {
  word.active = false;
});
const play = () => {
  if (audio.value.paused) {
    audio.value.play();
    word.active = true;
  }
};
</script>

<style lang="scss" scoped></style>
