<template>
  <div>
    <div>
      <input v-model="state.hello" type="text" />
    </div>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'

// bind object
const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' },null,{
  onError:()=>{
    console.log('000');
  }
})
</script>

<style lang="scss" scoped></style>
