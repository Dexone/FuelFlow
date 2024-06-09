<template>
    <div class="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow mt-3">
        <ul
            class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 ">
            <li class="me-2">
                <button value="1" :class="{ 'text-blue-600': page[0] }"
                    @click="page[1] = false, page[2] = false, page[0] = true, updateInfo()"
                    class="inline-block p-4  rounded-ss-lg hover:bg-gray-100 ">Пробег</button>
            </li>
            <li class="me-2">
                <button :class="{ 'text-blue-600': page[1] }"
                    @click="page[1] = true, page[2] = false, page[0] = false, updateInfo()"
                    class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 ">Стоимость</button>
            </li>
            <li class="me-2">
                <button :class="{ 'text-blue-600': page[2] }"
                    @click="page[1] = false, page[2] = true, page[0] = false, updateInfo()"
                    class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 ">Расход</button>
            </li>
        </ul>


        <div id="defaultTabContent">
            <div class="mx-auto p-4 bg-white rounded-lg md:p-8" id="about" role="tabpanel" aria-labelledby="about-tab">


                <!-- loader -->
                <div v-if="hiddenStore.loaderUpdateInfo === true" role="status" class="max-w-sm p-4  rounded  animate-pulse md:p-6 dark:border-gray-700">
                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                    <div class="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div class="flex items-baseline mt-4">
                        <div class="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                        <div class="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                        <div class="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                    </div>
                </div>
                <!-- loader -->



                <LineChart v-if="hiddenStore.loaderUpdateInfo === false" :chartData="lineData" :options="options" />
            </div>
        </div>
    </div>




</template>
<script setup>
import axios from 'axios'
import Chart from 'chart.js/auto';
import { LineChart } from "vue-chart-3"
import { computed, inject, watch, ref, reactive } from 'vue'
import { useUser } from '../../store/User';
import { useComponents } from '../../store/ComponentsHidden';
const hiddenStore = useComponents();
const userStore = useUser();
defineProps({
    msg: String,
})

const page = ref([true, false, false])


const info = ref([])
const date = ref([])
const total = ref('загрузка...')
const label = ref('загрузка...')
function updateInfo() {
    info.value = []
    date.value = []
    if (page.value[0] === true) { //пробег в день
        for (let i = 1; i < userStore.userInfo.length; i++) {
            info.value.push((((userStore.userInfo[i][1] - userStore.userInfo[i - 1][1]) / ((userStore.userInfo[i][0] - userStore.userInfo[i - 1][0]) / 1000 / 60 / 60)) * 24).toFixed())
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5)))
        }
        label.value = "График среднего пробега по дням"
    }
    if (page.value[1] === true) { //стоимость в день
        for (let i = 1; i < userStore.userInfo.length; i++) {
            info.value.push((((userStore.userInfo[i][2] * userStore.userCost) / ((userStore.userInfo[i][0] - userStore.userInfo[i - 1][0]) / 1000 / 60 / 60)) * 24).toFixed())
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5)))
        }
        label.value = "График средней стоимости по дням"
    }
    if (page.value[2] === true) { //расход в день
        for (let i = 1; i < userStore.userInfo.length; i++) {
            info.value.push((((userStore.userInfo[i][2]) / (userStore.userInfo[i][1] - userStore.userInfo[i - 1][1])) * 100).toFixed(1))
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5)))
        }
        label.value = "График среднего расхода по дням"
    }
    total.value = 'Среднее значение: ' + (info.value.reduce((summ, item) => summ + Number(item), 0) / (userStore.userInfo.length - 1)).toFixed(1) //среднее арифметическое данных
}

watch(userStore, () => {
    updateInfo()
})





const options = reactive({
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: total,
        },
    },
});



const lineData = computed(() => ({
    name: total,
    labels: date.value,
    boxWidth: 0,
    datasets: [
        {
            data: info.value,
            label: label.value,
            borderColor: 'rgb(55, 65, 81)', //цвет линии
            borderWidth: 1, // толщина линии
            backgroundColor: 'rgba(255, 255, 255, 0.0)', //точки
        },

    ],

}));

</script>