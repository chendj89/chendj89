<template>
  <div class="vp-word">
    <slot></slot>
    <code class="vp-word-content">
      <div class="vp-word-soundmark">{{ word.soundmark }}</div>
      <audio ref="audio" class="vp-word-audio" controls>
        <source :src="word.src" />
      </audio>
      <EmojioneMonotoneStudioMicrophone class="vp-word-icon" @click.native="play"></EmojioneMonotoneStudioMicrophone>
    </code>
  </div>
</template>

<script setup>
import EmojioneMonotoneStudioMicrophone from '~icons/emojione-monotone/studio-microphone'
// import http from "http";
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue";
const ins = getCurrentInstance();
const audio = ref(null);
let text = ins.proxy.$slots.default[0].text;

let word = reactive({
  name: ins.proxy.$slots.default[0].text,
  soundmark: "",
  src: "",
  allow: true,
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
const play = () => {
  console.log(audio.value.playbackRate  );
  if (audio.value.paused) {
    audio.value.play();
  }
};
</script>

<style lang="scss" scoped></style>
