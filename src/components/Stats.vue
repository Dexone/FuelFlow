<template>















    <div class="flex items-start font-semibold text-gray-900 text-2xl mt-3 max-w-md mx-auto">
        <div class="flex h-5">
            {{ userStore.userCar }}
        </div>
        <button @click="hiddenStore.showEditCar = !hiddenStore.showEditCar" class="ms-auto text-blue-700 mt-1">
            <svg class="w-6 h-6 text-blue-700 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
            </svg>
        </button>
    </div>
    <div class="flex items-start max-w-md mx-auto">
        <div class="flex items-center h-5 text-gray-500 text-xs">
            11 мая 2024 - 17 Июл 2024
        </div>

    </div>




    <div class="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow p-6 mt-3">

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
                <a @click="userStore.updateInfo()" class="ms-auto text-sm text-blue-700 hover:underline">
                    <svg class="w-[20px] h-[20px] text-blue-600 " xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                    </svg>

                </a>
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
    setTimeout(() => {
        number.value = userStore.userInfo[userStore.userInfo.length - 1][1]
    }, 100);
    upTime.value = Date.now()
    updateTime()
})





</script>
