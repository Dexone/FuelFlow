<template>
    <!-- текущий пробег -->
    <div class="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow p-6 mt-3">
        <!-- loader -->
        <div v-if="userStore.userCost === 0">
            <!-- <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div> -->
            <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full"></div>
        </div>
        <!-- loader -->

        <div v-if="userStore.userCost != 0">
            <div class="flex items-start  text-gray-500 text-xs">
                <div class="flex  h-5">
                    Текущий пробег
                </div>
                <a class="ms-auto text-gray-400 text-xs">обновлено {{ backTime }} мин назад</a>
            </div>
            <div class="flex items-start">
                <div class="flex items-center h-5 text-gray-900 text-xl font-semibold">

                    <Vue3Odometer :value="number" /><a class="mb-1 ml-1">км</a>
                </div>
                <button @click="sync()" class="ms-auto text-sm text-blue-700 hover:underline">
                    <svg class="w-[20px] h-[20px] text-blue-600 " xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                    </svg>

                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUser } from '../../store/User';
import { useComponents } from '../../store/ComponentsHidden';
import { watch, ref } from 'vue';
import axios from 'axios';
import Vue3Odometer from 'vue3-odometer'
import 'odometer/themes/odometer-theme-default.css'
const number = ref(0)

const hiddenStore = useComponents();
const userStore = useUser();

defineProps({
    msg: String,
})





userStore.updateInfo()

const backTime = ref(0)
const upTime = ref(0)
setInterval(() => updateTime(), 60000); //обновлено ... мин назад
function updateTime() {
    backTime.value = ((Date.now() - upTime.value) / 1000 / 60).toFixed()
}

watch(userStore, () => { //odometr
    if (userStore.userInfo.length >= 1) {
        setTimeout(() => {
            number.value = userStore.userInfo[userStore.userInfo.length - 1][1]
        }, 100);
    }
    else {
        number.value = 0
    }
    upTime.value = Date.now()
    updateTime()

})

function sync() {
    axios.get(`https://martynovd.ru/back-api/data/2`).then((res) => {
        axios.patch(`https://martynovd.ru/back-api/data/1`, { car: res.data.car })
        axios.patch(`https://martynovd.ru/back-api/data/1`, { cost: res.data.cost })
        axios.patch(`https://martynovd.ru/back-api/data/1`, { maslo: res.data.maslo })
        axios.patch(`https://martynovd.ru/back-api/data/1`, { svechi: res.data.svechi })
        axios.patch(`https://martynovd.ru/back-api/data/1`, { masloAKPP: res.data.masloAKPP })
        axios.patch(`https://martynovd.ru/back-api/data/1`, { info: res.data.info })
        axios.patch(`https://martynovd.ru/back-api/data/1`, { toplFilter: res.data.toplFilter })
        axios.patch(`https://martynovd.ru/back-api/data/1`, { tormozn: res.data.tormozn })
    })
    userStore.updateInfo()
}
</script>