<template>
    <div class="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow mt-3">
        <ul
            class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50">
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


        <div>
            <div class="mx-auto p-4 bg-white rounded-lg p-8">


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



                <LineChart v-if="hiddenStore.loaderUpdateInfo === false" :chartData="lineData" :options="options" />
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
function updateInfo() {
    info.value = []
    date.value = []
    if (page.value[0] === true) { //пробег
        
        for (let i = 1; i < userStore.userInfo.length; i++) {
            info.value.push(((((userStore.userInfo[i][1] - userStore.userInfo[i - 1][1]) / ((userStore.userInfo[i][0] - userStore.userInfo[i - 1][0]) / 1000 / 60 / 60)) * 24)).toFixed(1))  //(следующий пробег - предыдущий)/((следующая дата - предыдущая дата)/1000мс /60сек/60мин) = пробег в час * 24часа = пробег в сутки
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5))) //массив дат

        }
        let average = (info.value.reduce((summ, item) => summ + Number(item), 0) / (userStore.userInfo.length - 1)) //среднее арифметическое инфо
        label.value = "Дневной пробег"
        total.value = 'Среднее: ' + average + " в день (~" + average*365 + " в год)" //среднее арифметическое данных
        // console.log((((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userInfo[0][1]) / ((userStore.userInfo[userStore.userInfo.length - 1][0] - userStore.userInfo[0][0]) / 1000 / 60 / 60)) * 24))
    }
    if (page.value[1] === true) { //стоимость
        for (let i = 1; i < userStore.userInfo.length; i++) {
            info.value.push((((userStore.userInfo[i][2] * userStore.userCost) / ((userStore.userInfo[i][0] - userStore.userInfo[i - 1][0]) / 1000 / 60 / 60)) * 24).toFixed())
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5)))
        }
        label.value = "Средняя стоимость в день"
    }
    if (page.value[2] === true) { //расход
        for (let i = 1; i < userStore.userInfo.length; i++) {
            info.value.push((((userStore.userInfo[i][2]) / (userStore.userInfo[i][1] - userStore.userInfo[i - 1][1])) * 100).toFixed(1))
            date.value.push(new Date(userStore.userInfo[i - 1][0]).toLocaleString().slice(0, 5) + " - " + (new Date(userStore.userInfo[i][0]).toLocaleString().slice(0, 5)))
        }
        label.value = "Средний расход топлива на 100км"
    }

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