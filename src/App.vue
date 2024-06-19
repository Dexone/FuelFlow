<script setup>
import History from './components/History.vue'
import Bar from './components/Bar.vue'
import Login from './components/Login.vue'
import Add from './components/Add.vue'
import Adjustment from './components/Adjustment.vue'
import BarChart from './components/BarChart.vue'
import Stats from './components/Stats.vue'
import Obsl from './components/Obsl.vue'
import LineChart from './components/LineChart.vue'
import { useComponents } from '../store/ComponentsHidden'
import { ref, watch } from 'vue'
const hiddenStore = useComponents();



const blur = ref(false)
watch(hiddenStore, () => {
  blurEdit()
})
function blurEdit() {
  if (hiddenStore.showLogin == false || hiddenStore.showAdd == false || hiddenStore.showAdjustment == false) {
    blur.value = true
  }
  else {
    blur.value = false
  }
}


</script>

<template>

  <div class="mx-3" :class="{ 'blur-md': blur }">
    <Stats />
    <LineChart />
    <BarChart />
    <History />
    <Obsl />
  </div>

  <Adjustment />
  <Bar />
  <Add />
  <Login />


  <footer class="max-w-md mx-auto mb-24">
    <hr class="my-6 border-gray-200 mx-auto" />
    <span class="block text-sm text-gray-500 text-center">© 2024 <a href="https://github.com/dexone"
        class="hover:underline">Dexone</a>. All Rights Reserved.</span>
  </footer>

</template>
