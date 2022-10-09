<template>
  <div>
    <NumInput class="el-input__inner" v-model="input"></NumInput>
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
