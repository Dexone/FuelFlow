<script setup>
import History from './components/History.vue'
import Bar from './components/Bar.vue'
import Login from './components/Login.vue'
import Add from './components/Add.vue'
import Adjustment from './components/Adjustment.vue'
import BarChart from './components/BarChart.vue'
import CarName from './components/CarName.vue'
import Obsl from './components/Obsl.vue'
import LineChart from './components/LineChart.vue'
import Reminders from './components/Reminders.vue'
import EditObsl from './components/EditObsl.vue'
import LeftBar from './components/LeftBar.vue'
import Footer from './components/Footer.vue'
import Probeg from './components/Probeg.vue'
import { useComponents } from '../store/ComponentsHidden'
import { ref, watch } from 'vue'
const hiddenStore = useComponents();



const blur = ref(false)
watch(hiddenStore, () => {
  blurEdit()
})


function blurEdit() {
  if (hiddenStore.login === false || hiddenStore.add === false || hiddenStore.adjustment === false || hiddenStore.obsl === false) {
    blur.value = true
  }
  else {
    blur.value = false
  }
}


</script>

<template>


  <div class="max-w-5xl mx-auto">
    <LeftBar />

    <div class="sm:ml-64 ">

      <div class="max-w-2xl">
        <div class="mx-3" :class="{ 'blur-md': blur }">
          <CarName />
          <Probeg />
          <Reminders />
          <LineChart />
          <BarChart />
          <History />
          <Obsl />
        </div>

 
        <EditObsl />
        <Adjustment />
        <Bar />
        <Add />
        <Login />
        <Footer />

      </div>
    </div>
  </div>

</template>
