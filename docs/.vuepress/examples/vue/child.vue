<template>
  <div>
    <div @click="updateUserName">{{ props.name }}</div>
    <div @click="updateUserHeight">{{ props.height }}</div>
    <div @click="updateUserAge">{{ props.age }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  name: String,
  height: String,
  age: String,
});
const emit = defineEmits([
  "updateUserName",
  "updateUserHeight",
  "updateUserAge",
]);
const updateUserName = () => {
  emit("updateUserName", props.name);
};
const updateUserHeight = () => {
  emit("updateUserHeight", props.height);
};
const updateUserAge = () => {
  emit("updateUserAge", props.age);
};
</script>
