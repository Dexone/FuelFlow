<template>
    <div class="w-full bg-blue-700 border border-gray-200 rounded-lg shadow mt-3">

        <div>
            <div class="mx-auto p-4 bg-blue-700 rounded-lg">

                <!-- loader -->
                <div v-if="userStore.userCost === 0" class="max-w-2xl p-4  rounded  animate-pulse p-6 ">
                    <div class="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
                    <div class="w-48 h-2 mb-6 bg-gray-200 rounded-full"></div>
                    <div class="flex items-baseline mt-4">
                        <div class="w-full bg-gray-200 rounded-t-lg h-16"></div>
                        <div class="w-full h-10 ms-6 bg-gray-200 rounded-t-lg"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-16 ms-6"></div>
                        <div class="w-full h-14 ms-6 bg-gray-200 rounded-t-lg"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-16 ms-6"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-10 ms-6"></div>
                        <div class="w-full bg-gray-200 rounded-t-lg h-16 ms-6"></div>
                    </div>
                </div>
                <!-- loader -->

                <!-- <label v-if="userStore.userCost != 0" class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" v-model="selectedRange">
                    <div
                        class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600">
                    </div>
                    <span class="ms-3 text-sm font-medium text-white ">10 дней</span>
                </label> -->

                <LineChart class="max-h-40" v-if="userStore.userCost != 0" :chartData="lineData" :options="options" />
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

const selectedRange = ref(false)

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
    let litres = 0 //средний расход
    for (let i = enterDate.value + 1; i < userStore.userInfo.length; i++) {
        info.value.push((((userStore.userInfo[i][2]) / (userStore.userInfo[i][1] - userStore.userInfo[i - 1][1])) * 100).toFixed(2)) //(кол-во литров) / (пробег следующий - пробег предыдущий) * 100км
        date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5)))

        //средний расход:
        litres = litres + Number(userStore.userInfo[i][2])
        //
    }
    if (userStore.userInfo.length >= 2) {
        let average = (litres / (userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userInfo[enterDate.value][1])) * 100 //средний расход
        total.value = average.toFixed(1) + " л/100км"
    }
    else {
        total.value = 0
    }
    label.value = "Средний расход топлива на 100км"
}

watch([userStore, hiddenStore], () => {
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
            color: 'rgb(199, 206, 223)',
            font: {
                size: 16,
                weight: 'bold',
            },
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
