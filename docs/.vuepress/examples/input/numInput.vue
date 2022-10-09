<template>
  <input
    type="text"
    :value="modelValue"
    @input="emitValue('modelValue', $event)"
  />
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({}),
    },
  },
  methods: {
    emitValue(propName, evt) {
      let val = evt.target.value;
      if (true) {
        val = val.replace(/[^\d.]/g, "");
        this.$emit(`update:${propName}`, val);
        evt.target.value = val;
      }
    },
  },
};
</script>

<style></style>
