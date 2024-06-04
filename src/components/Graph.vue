<template>
    <div class="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow mt-3 mb-24">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 "
            id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
            <li class="me-2">
                <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about"
                    aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 ">Средний
                    пробег</button>
            </li>
            <li class="me-2">
                <button id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services"
                    aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 ">В
                    Разработке</button>
            </li>
            <li class="me-2">
                <button id="statistics-tab" data-tabs-target="#statistics" type="button" role="tab"
                    aria-controls="statistics" aria-selected="false"
                    class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 ">В разработке</button>
            </li>
        </ul>


        <div id="defaultTabContent">
            <div class=" p-4 bg-white rounded-lg md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">
                <LineChart :chartData="lineData" />
            </div>
        </div>
    </div>




</template>
<script setup>
import axios from 'axios'
import Chart from 'chart.js/auto';
import { LineChart } from "vue-chart-3"
import { computed, inject, watch, ref } from 'vue'
import { useUser } from '../../store/User';
const userStore = useUser();
defineProps({
    msg: String,
})

const probeg = ref([])
const date = ref([])
function updateInfo() {
    probeg.value = []
    date.value=[]
    for (let i = 1; i < userStore.userInfo.length; i++) {
        probeg.value.push((((userStore.userInfo[i][1] - userStore.userInfo[i - 1][1]) / ((userStore.userInfo[i][0] - userStore.userInfo[i - 1][0]) / 1000 / 60 / 60)) * 24).toFixed())
        date.value.push(new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5))
        console.log(date)
    }
}

watch(userStore, () => {
    updateInfo()
})

const lineData = computed(() => ({
    labels: date.value,
    boxWidth: 0,
    datasets: [
        {
            data: probeg.value,
            label: 'График среднего пробега в день',
            borderColor: 'rgb(55, 65, 81)', //цвет линии
            borderWidth: 1, // толщина линии
            backgroundColor: 'rgba(255, 255, 255, 0.0)', //точки
        },
    ],
}));


</script>