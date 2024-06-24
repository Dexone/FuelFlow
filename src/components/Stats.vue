<template>
    <div class="max-w-2xl mx-auto">
        <div :class="{ 'hidden': showEditCar }"
            class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-[470px]">
            <div class="relative px-3 md:px-0 w-full  max-h-full">
                <div class="relative bg-white">

                    <div v-if="userStore.userCost != 0">
                        <div class="flex items-center w-full max-w-2xl mx-auto text-gray-900">
                            <div class="font-normal">
                                <form class="z-10">
                                    <div class="relative">
                                        <input v-model="car" :placeholder="userStore.userCar"
                                            class="block py-2.5 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />

                                        <button @click="editCar()" class="absolute end-2.5 bottom-2.5 rounded-lg"><svg
                                                @click="showEditCar = !showEditCar" class="w-6 h-6 text-gray-600"
                                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                                height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2"
                                                    d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </button>

                                    </div>
                                </form>
                            </div>
                            <div class="flex items-center ms-auto mt-2.5">
                                <button @click="showEditCar = !showEditCar" class="ms-auto text-blue-700 mt-1">
                                    <svg class="w-6 h-6 text-blue-700" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <!-- fdfdfdf -->
        <div class="flex items-start font-semibold text-gray-900 text-2xl mt-3">

            <div class="flex h-5">
                {{ userStore.userCar }}
            </div>
            <button @click="showEditCar = !showEditCar" class="ms-auto text-blue-700 mt-1">
                <svg class="w-6 h-6 text-blue-700 " xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
            </button>
        </div>
        <div class="flex items-start  ">
            <div class="flex items-center h-5 text-gray-500 text-xs" v-if="userStore.userInfo.length < 1">
                Недостаточно данных
            </div>
            <div class="flex items-center h-5 text-gray-500 text-xs" v-if="userStore.userInfo.length >= 1">
                {{ new Date(userStore.userInfo[0][0]).toLocaleString().slice(0, 10) }} - {{ new
                    Date(userStore.userInfo[userStore.userInfo.length - 1][0]).toLocaleString().slice(0, 10) }}
            </div>

        </div>

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
                    <a @click="userStore.updateInfo(), sync()" class="ms-auto text-sm text-blue-700 hover:underline">
                        <svg class="w-[20px] h-[20px] text-blue-600 " xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                        </svg>

                    </a>
                </div>
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

const showEditCar = ref(true)

const car = ref()
function editCar() {
    if (userStore.userID === 1) {
        hiddenStore.showLogin = !hiddenStore.showLogin
    }
    else {
        axios.patch(`https://martynovd.ru/back-api/data/${userStore.userID}`, { car: car.value }) //
        userStore.updateInfo()
    }
}

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
}
</script>
