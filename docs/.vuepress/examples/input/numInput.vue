<script setup>
const props = defineProps({
  // v-model
  modelValue: String,
  // 修饰符
  modelModifiers: { default: () => ({}) },
});

const emit = defineEmits(["update:modelValue"]);
function emitValue(e) {
  let value = e.target.value;
  emit("update:modelValue", value);
  if (true) {
    // value = value.replace(/[^\d.]/g, "");
    // e.target.value = value;
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>