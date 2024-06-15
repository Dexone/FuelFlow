<template>








    <div class="w-full max-w-md mx-auto bg-blue-700 border border-gray-200 rounded-lg shadow mt-3 ">


        <div>
            <div class="mx-auto p-4 bg-blue-700 rounded-lg">


                <!-- loader -->
                <div v-if="hiddenStore.loaderUpdateInfo === true" class="max-w-sm p-4  rounded  animate-pulse p-6 ">
                    <div class="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
                    <div class="w-48 h-2 mb-10 bg-gray-200 rounded-full"></div>
                    <div class="flex items-baseline mt-4">
                        <div class="w-full bg-gray-200 rounded-t-lg h-72"></div>
                        <div class="w-full h-56 ms-6 bg-gray-200 rounded-t-lg"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6"></div>
                        <div class="w-full h-64 ms-6 bg-gray-200 rounded-t-lg"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-72 ms-6"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-80 ms-6"></div>
                    </div>
                </div>
                <!-- loader -->



                <LineChart class="max-h-40" v-if="hiddenStore.loaderUpdateInfo === false" :chartData="lineData"
                    :options="options" />
            </div>
        </div>
    </div>




</template>
<script setup>
import axios from 'axios'
import Chart from 'chart.js/auto';
import { LineChart } from "vue-chart-3"
import { computed, watch, ref, reactive } from 'vue'
import { useUser } from '../../store/User';
import { useComponents } from '../../store/ComponentsHidden';
const hiddenStore = useComponents();
const userStore = useUser();
defineProps({
    msg: String,
})

const page = ref([true, false, false])

const info = ref([]) //значения в графике
const date = ref([]) //даты в графике
const total = ref('загрузка...') //среднее значение
const label = ref('загрузка...') //название графика

function searchMonth() {

}

function updateInfo() {
    info.value = []
    date.value = []

    for (let i = 1; i < userStore.userInfo.length; i++) {
        info.value.push((((userStore.userInfo[i][2]) / (userStore.userInfo[i][1] - userStore.userInfo[i - 1][1])) * 100).toFixed(2)) //(кол-во литров) / (пробег следующий - пробег предыдущий) * 100км
        date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5)))
    }
    let average = (info.value.reduce((summ, item) => summ + Number(item), 0) / (info.value.length)) //среднее арифметическое инфо
    label.value = "Средний расход топлива на 100км"
    total.value = 'Средний расход: ' + average.toFixed(1) + "л"
}

watch(userStore, () => {
    updateInfo()
})

const options = reactive({
    responsive: true,
    scales: {
        y: {
            grid: {
                color: 'rgb(255, 255, 255)',
                borderColor: 'rgb(255, 255, 255)',
                tickColor: 'rgb(255, 255, 255)',
            },
            ticks: {
                color: 'rgb(255, 255, 255)',
                backdropColor: 'rgb(255, 255, 255)',
            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                display: false,
                color: 'rgb(255, 255, 255)',
            }
        }
    },
    plugins: {
        legend: {
            display: false
        },

        title: {
            align: 'end',
            display: true,
            text: total,
            color: 'rgb(255, 255, 255)',
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

            borderColor: 'rgb(255, 255, 255)', //цвет линии
            borderWidth: 2, // толщина линии
            backgroundColor: 'rgba(255, 255, 255)', //точки
            color: 'rgba(255, 255, 255)', //точки
            tickColor: 'rgba(255, 255, 255)',
        },
    ],
}));

</script>
