<template>
  <el-form :model="form" ref="formRef" label-width="60px" @submit.native.prevent>
    <el-form-item label="年龄" prop="age" :rules="rules.age">
      <el-input type="age" v-model.number="form.age" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
const ins = getCurrentInstance();
const formRef = ref(null);
const form = reactive({
  age: 0,
});
const rules = reactive({
  age: [
    {
      type: "number",
      message: "年龄必须为数字值",
    },
    {
      required: true,
      message: "年龄不能为空",
    },
  ],
});

const submitForm = (formName) => {
  formRef.value.validate((valid, value, callback) => {
    if (valid) {
      ins.proxy.$notify({
        title: "提示",
        type: "success",
        message: "提交成功"
      });
    } else {
      console.log(value);
      console.log("error submit!!");
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
</style>
