<template>



    <div class="text-sm font-medium text-center text-gray-500 max-w-md mx-auto ">
        <ul class="flex flex-wrap -mb-px">
            <li class="me-2">
                <button :class="{ 'text-blue-600': page[0], 'border-blue-600': page[0] }"
                    @click="page[1] = false, page[2] = false, page[0] = true, updateInfo()"
                    class="inline-block p-4 border-b-2  rounded-t-lg ">Пробег</button>
            </li>
            <li class="me-2">
                <button :class="{ 'text-blue-600': page[1], 'border-blue-600': page[1] }"
                    @click="page[1] = true, page[2] = false, page[0] = false, updateInfo()"
                    class="inline-block p-4  border-b-2  rounded-t-lg">Стоимость</button>
            </li>
            <li class="me-2">
                <button :class="{ 'text-blue-600': page[2], 'border-blue-600': page[2] }"
                    @click="page[1] = false, page[2] = true, page[0] = false, updateInfo()"
                    class="inline-block p-4 border-b-2  rounded-t-lg ">Расход</button>
            </li>
        </ul>
    </div>





    <div class="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow mt-3">



        <div>
            <div class="mx-auto p-4 bg-white rounded-lg">


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



                <BarChart v-if="hiddenStore.loaderUpdateInfo === false" :chartData="lineData" :options="options" />
            </div>
        </div>
    </div>




</template>
<script setup>
import axios from 'axios'
import Chart from 'chart.js/auto';
import { LineChart } from "vue-chart-3"
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BarChart } from 'vue-chart-3';
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
    if (page.value[0] === true) { //пробег

        for (let i = 1; i < userStore.userInfo.length; i++) {
            info.value.push(((((userStore.userInfo[i][1] - userStore.userInfo[i - 1][1]) / ((userStore.userInfo[i][0] - userStore.userInfo[i - 1][0]) / 1000 / 60 / 60)) * 24)).toFixed(1))  //(следующий пробег - предыдущий)/((следующая дата - предыдущая дата)/1000мс /60сек/60мин) = пробег в час * 24часа = пробег в сутки
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5))) //массив дат

        }
        let average = (info.value.reduce((summ, item) => summ + Number(item), 0) / (info.value.length)) //среднее арифметическое инфо
        label.value = "Дневной пробег"
        total.value = 'Среднее: ' + average + " в день (~" + average * 365 + " в год)" //среднее арифметическое данных
        // console.log((((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userInfo[0][1]) / ((userStore.userInfo[userStore.userInfo.length - 1][0] - userStore.userInfo[0][0]) / 1000 / 60 / 60)) * 24))

    }
    if (page.value[1] === true) { //стоимость
        for (let i = 1; i < userStore.userInfo.length; i++) {
            info.value.push((((userStore.userInfo[i][2] * userStore.userCost) / ((userStore.userInfo[i][0] - userStore.userInfo[i - 1][0]) / 1000 / 60 / 60)) * 24).toFixed()) //(кол-во литров * стоимость литра) / (следующая дата - предыдущая дата) / 1000мс / 60с / 60мин * 24 часа = стоимость езды в сутки
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5))) //массив дат
        }

        let average = (info.value.reduce((summ, item) => summ + Number(item), 0) / (info.value.length)) //среднее арифметическое инфо
        label.value = "Дневная стоимость"
        total.value = 'Среднее: ' + average + " в день (~" + average * 30.5 + " в месяц)"


    }
    if (page.value[2] === true) { //расход
        for (let i = 1; i < userStore.userInfo.length; i++) {
            info.value.push((((userStore.userInfo[i][2]) / (userStore.userInfo[i][1] - userStore.userInfo[i - 1][1])) * 100).toFixed(2)) //(кол-во литров) / (пробег следующий - пробег предыдущий) * 100км
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5)))
        }
        let average = (info.value.reduce((summ, item) => summ + Number(item), 0) / (info.value.length)) //среднее арифметическое инфо
        label.value = "Средний расход топлива на 100км"
        total.value = 'Среднее: ' + average.toFixed(1)
    }

}

watch(userStore, () => {
    updateInfo()
})

const options = reactive({
    responsive: true,
    plugins: [ChartDataLabels],
    options: {
        color: 'black'
    },

    scales: {
        y: {
            grid: {
                display: false
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

    plugins:

    {
        legend: {
            position: 'top',

        },

        title: {
            display: true,
            text: total,
        },
        datalabels: {
            color: '#36A2EB'
        }
    },
});

const lineData = computed(() => ({
    name: total,
    labels: date.value,
    boxWidth: 0,
    datalabels: {
        color: 'black',
        align: 'top'
    },
    datasets: [
        {
            data: info.value,
            label: label.value,
            borderColor: 'rgb(55, 65, 81)', //цвет линии
            borderWidth: 0, // толщина линии
            backgroundColor: 'rgb(26, 86, 219)', //точки
            datalabels: {
                color: '#FFCE56'
            }
        },

    ],
}));

</script>