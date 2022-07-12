<template>
  <div>
    <el-tooltip
      effect="dark"
      :content="example.content"
      placement="top"
      :disabled="example.hide"
      :open-delay="200"
    >
      <div
        @click="toogleClass"
        ref="ele"
        :class="['example', { active: example.active }]"
      >
        {{ example.content }}
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted,
  nextTick,
  getCurrentInstance,
} from "vue";
const ins = getCurrentInstance();
let ele = ref();
const example = reactive({
  content: "威威威威维瓦尔啊打发打发十大地方啊",
  active: false,
  hide: false,
});
onMounted(() => {
  if (ele.value) {
    example.hide = ele.value?.offsetWidth > ele.value?.scrollWidth;
  }
});
ins.proxy.$http
  .get("/api/mock", {
    content: "@csentence(12)",
  })
  .then((res) => {
    example.content = res.data.content;
  });
let toogleClass = () => {
  example.active = !example.active;
  example.hide = !example.hide;
};
</script>

<style lang="scss" scoped>
.example {
  display: inline-block;
  padding: 5px 10px;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // width: 120px;
  &.active {
    width: 120px;
  }
}
</style>
