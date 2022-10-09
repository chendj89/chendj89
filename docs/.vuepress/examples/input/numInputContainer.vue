<template>
  <div>
    只能输入数字:
    <NumInput v-model="myText" />
    <div>
        div:{{myText}}
    </div>
    <div>
        div:{{input}}
    </div>
    <input type="text" v-model="input">
  </div>
</template>
<script setup>
// https://sfc.vuejs.org/#eNp9U8Fu1DAQ/ZVRLsmquw7nkK1AiGMlJBCXukghmSyuEtuynYUlyglx5oAQX8AFCYkfgL9Z1M9gbG+XtFS97MZvxu/Nm/GMyWOt2XbApEhKWxuhHVh0gz7lUvRaGQcjGGxhgtaoHlJKTY+hs90TRV8SpTuEWT7DPC8lA3BZK2kd9LsX+M7B2jNmabrgssyjKMnRwWGvu8ohnQD2n75fffh19fvz/uO3P19+7n98LTxczkW3q1412LG60sJVnXiPa55EFZ5AHnjKRmzDB8A4xtg0hUAeI2V+1E2WSbS26ivNLq2S1JcxWDgELE8KCIjHyKA/8+SNc9oWeW7b2ru+tEyZTU5fzAzSiR4Z2n712qi3Fg0R82Q548gJ3KJZGZQNGjT3cd5K/Y/X05K9iazcGsUdI45j0UZpS1NpsBUSn/lTFiyG5r6sugELeO6MkJtQdYDPVCNagcZSO/zNauhcAdkC1qeQjdMiFEETvhbBXvjJR42ndLDZeTrohtpe/NNJL+hKhw5qRX1bP3jIZTvI2gklA0NIynARR+ATtx4hYmSuMhskpx7wUdFCFqyxmwXPXsuBB44s4Z8ZpOdQY5afv+K8YRf5Zknz4MmCyvHZ3pHqkHVqk4Ub14FQY3aHrWVkJnMh60at6/AbGMK7DNZPTjwwFwqwF6Kke9amFFIPDtxO+11wcROKKES7cSyJ0EchldBjZw9LM9+I6S9shncT
import { ref,watchEffect } from "vue";
import NumInput from "./numInput.vue";
let myText = ref("");
watchEffect(()=>{
  console.log(myText);
});
let input=ref(0);
watchEffect(()=>{
  console.log(input);
});
</script>
