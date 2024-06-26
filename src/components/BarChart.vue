<template>
    <div class="text-sm font-medium text-center text-gray-500">
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
        </ul>
    </div>

    <div class="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow mt-3">
        <div>
            <div class="mx-auto p-4 bg-white rounded-lg">

                <!-- loader -->
                <div v-if="userStore.userCost === 0" class="max-w-2xl p-4 rounded animate-pulse p-6 ">
                    <div class="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
                    <div class="w-48 h-2 mb-6 bg-gray-200 rounded-full"></div>
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
                <!-- <label v-if="userStore.userCost != 0" class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" v-model="selectedRange">
                    <div
                        class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600">
                    </div>
                    <span class="ms-3 text-sm font-medium text-gray-600 ">10 дней</span>
                </label> -->

                <BarChart v-if="userStore.userCost != 0" :chartData="lineData" :options="options" />
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
const subtotal = ref('загрузка...') //прогноз на год
const label = ref('загрузка...') //название графика

// const selectedRange = ref(false)

function updateInfo() {
    const enterDate = ref(0)
    if (hiddenStore.selectedRange === true) {
        let seconds = Date.now() - 1209600000 //текущая дата - неделя в милисекундах
        for (let i = 0; i < userStore.userInfo.length; i++) {
            if (userStore.userInfo[i][0] > seconds) { //поиск ближайшего наименьшего значения, большего чем seconds и остановка цикла
                enterDate.value = i
                break
            }
        }
    }

    info.value = []
    date.value = []

    if (page.value[0] === true) { //пробег
        for (let i = enterDate.value + 1; i < userStore.userInfo.length; i++) {
            info.value.push(((((userStore.userInfo[i][1] - userStore.userInfo[i - 1][1]) / ((userStore.userInfo[i][0] - userStore.userInfo[i - 1][0]) / 1000 / 60 / 60)) * 24)).toFixed(1))  //(следующий пробег - предыдущий)/((следующая дата - предыдущая дата)/1000мс /60сек/60мин) = пробег в час * 24часа = пробег в сутки
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5))) //массив дат
        }
        if (userStore.userInfo.length >= 1) {
            let average = (((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userInfo[enterDate.value][1]) / ((userStore.userInfo[userStore.userInfo.length - 1][0] - userStore.userInfo[enterDate.value][0]) / 1000 / 60 / 60)) * 24)
            total.value = average.toFixed() + "км в день"  //среднее арифметическое данных
            subtotal.value = (average * 365).toFixed() + "км в год"
        }
        else {
            total.value = 0
            subtotal.value = 0
        }
        label.value = "Дневной пробег"
    }
    if (page.value[1] === true) { //стоимость

        let summ = 0 //сумма всех заправок
        for (let i = enterDate.value + 1; i < userStore.userInfo.length; i++) {
            info.value.push((((userStore.userInfo[i][2] * userStore.userCost) / ((userStore.userInfo[i][0] - userStore.userInfo[i - 1][0]) / 1000 / 60 / 60)) * 24).toFixed()) //(кол-во литров * стоимость литра) / (следующая дата - предыдущая дата) / 1000мс / 60с / 60мин * 24 часа = стоимость езды в сутки
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5))) //массив дат

            //для средней стоимости:
            summ = summ + (userStore.userCost * userStore.userInfo[i][2]) //сумма всех заправок
        }
        if (userStore.userInfo.length >= 1) {
            let average = (summ / ((userStore.userInfo[userStore.userInfo.length - 1][0] - userStore.userInfo[enterDate.value][0]) / 1000 / 60 / 60)) * 24
            total.value = average.toFixed() + "р в день"
            subtotal.value = average.toFixed() * 30.5 + "р в месяц"
        }
        else {
            total.value = 0
            subtotal.value = 0
        }
        label.value = "Дневная стоимость"
    }

}

watch([userStore, hiddenStore], () => {
    updateInfo()

})

const options = reactive({
    responsive: true,

    scales: {
        y: {
            grid: {
                display: false
            },
            ticks: {
                color: 'rgb(55, 55, 55)',
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
        },
    },
    plugins:

    {
        legend: {
            position: 'top',
            display: false,
        },

        title: {            
            color: 'black',
            align: 'start',
            display: true,
            text: total,
            font: {
                size: 18,
            },
        },

        subtitle: {
            display: true,
            text: subtotal,
            color: 'grey',
            align: 'start',
            padding: {
                bottom: 30
            },
            font: {
                size: 12,
                family: 'tahoma',
                weight: 'normal',

            }
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
    datasets: [
        {
            data: info.value,
            label: label.value,
            borderColor: 'rgb(55, 65, 81)', //цвет линии
            borderWidth: 0, // толщина линии
            backgroundColor: 'rgb(26, 86, 219)', //точки
        },

    ],
}));
</script>