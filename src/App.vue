<script setup>
import Default from './components/Default.vue'
import Bar from './components/Bar.vue'
import Login from './components/Login.vue'
import Add from './components/Add.vue'
import Adjustment from './components/Adjustment.vue'
import Graph from './components/Graph.vue'
import Stats from './components/Stats.vue'
import { useComponents } from '../store/ComponentsHidden'
const hiddenStore = useComponents();
</script>

<template>
  <div :class="{ 'blur-md': hiddenStore.blur }">
    <Stats />
    <Default />
    <Graph />
  </div>

  <Adjustment />
  <Bar />
  <Add />
  <Login />

  <!-- <div class="routerViews">
    <router-view>
    </router-view>
  </div> -->

</template>
