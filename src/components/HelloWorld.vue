<script setup>
import { ref } from 'vue'
import axios from 'axios';

defineProps({
  msg: String,
})

axios.get(`https://martynovd.ru/back-api/users`).then((res) => {
        console.log(res.data)
      })
</script>

<template>
 
</template>

<style scoped>

</style>
