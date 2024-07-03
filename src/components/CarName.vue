<template>
    <div v-if="userStore.userCost === 0"
        class="max-w-2xl p-0.5 space-y-4  divide-y divide-gray-200 rounded animate-pulse mt-6">
        <div class="flex items-center justify-between">
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
        </div>
    </div>



    <div class=" mt-4" v-if="userStore.userCost != 0">

        <div class="flex font-bold text-gray-900 text-3xl items-center w-full">

            {{ userStore.userCar }}

            <!-- edit -->
            <div class="absolute bg-white w-64 h-6" v-if="showEditCar === false">
                <div class="relative">
                    <input v-model="car"
                        class="block w-full  text-sm text-gray-900 border-b-2 focus:outline-none focus:border-blue-600 max-w-24"
                        :placeholder="userStore.userCar">
                    <button class="text-black absolute start-20 bottom-0  font-medium rounded-lg text-sm py-1"
                        @click="editCar()"><svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 11.917 9.724 16.5 19 7.5" />
                        </svg>
                    </button>

                    <!-- <button class="text-black absolute end-0 bottom-0   font-medium rounded-lg text-sm py-1"><svg
                                class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                        </button> -->
                </div>
            </div>
            <!-- edit -->


            <div class="flex items-center ms-auto">
                <!-- <a class="px-1.5 rounded-lg"> {{ info[2] }}л
                        </a> -->
                <button v-if="showEditCar === true" @click="showEditCar = false" class="ms-auto text-blue-700 mt-1">
                    <svg class="w-6 h-6 text-blue-600 " xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                    </svg>
                </button>


                <button v-if="showEditCar === false" @click="showEditCar = true" class="ms-auto text-blue-700 mt-1">
                    <svg class="w-6 h-6 text-blue-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
</svg>

                </button>

            </div>

        </div>
        <p class="text-gray-500 text-sm" v-if="userStore.userInfo.length < 1">Недостаточно данных</p>
        <p class="text-gray-500 text-sm" v-if="userStore.userInfo.length >= 1"> {{ new
            Date(userStore.userInfo[0][0]).toLocaleString().slice(0,
            10) }} - {{ new
                Date(userStore.userInfo[userStore.userInfo.length - 1][0]).toLocaleString().slice(0, 10) }}</p>

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
        hiddenStore.showLogin()
    }
    else {
        axios.patch(`https://dexone.ru/backend_fuelly/data/${userStore.userID}`, { car: car.value }) //
        userStore.updateInfo()
        showEditCar.value = true
    }
}


</script>
