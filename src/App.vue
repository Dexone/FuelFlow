<script setup>
import History from './components/History.vue'
import Bar from './components/Bar.vue'
import Login from './components/Login.vue'
import Add from './components/Add.vue'
import Adjustment from './components/Adjustment.vue'
import Graph from './components/Graph.vue'
import Stats from './components/Stats.vue'
import Obsl from './components/Obsl.vue'
import { useComponents } from '../store/ComponentsHidden'
const hiddenStore = useComponents();
</script>

<template>


  <nav class="bg-white border-gray-200 mx-auto max-w-36">
    <div class="flex flex-wrap items-center justify-between mx-auto p-4">
      <a class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../public/car.ico" class="h-8" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fuelly</span>
      </a>

    </div>
  </nav>




  <div class="mx-3" :class="{ 'blur-md': hiddenStore.blur }">
    <Stats />
    <History />
    <Graph />
    <Obsl />
  </div>

  <Adjustment />
  <Bar />
  <Add />
  <Login />

  <!-- <div class="routerViews">
    <router-view>
    </router-view>
  </div> -->




  <footer class=" dark:bg-gray-900 max-w-md mx-auto mb-24 ">

    <hr class="my-6 border-gray-200 mx-auto" />
    <span class="block text-sm text-gray-500 text-center">© 2024 <a href="https://github.com/dexone"
        class="hover:underline">Dexone</a>. All Rights Reserved.</span>


  </footer>





</template>
