<template>
  <div>
    <div>只能输入数字和.</div>
    <NumInput v-model="input"></NumInput>
    <div>{{input}}</div>
  </div>
</template>

<script>
import NumInput from "./numInput.vue";
export default {
  components:{
    NumInput
  },
  data(){
    return {
      input:"123"
    }
  }
}
</script>

<style>

</style>
