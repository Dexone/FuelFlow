<template>




    <div class="flex items-start font-semibold text-gray-900 text-2xl mt-3">
        <div class="flex h-5">
            {{ userStore.userCar }}
        </div>
        <a class="ms-auto text-blue-700">
            <svg class="w-6 h-6 text-blue-700 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
            </svg>
        </a>
    </div>
    <div class="flex items-start">
        <div class="flex items-center h-5 text-gray-500 text-xs">
            27окт 2022 - 09 Июл 20023
        </div>

    </div>




    <div class="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow p-6">

        <!-- loader -->
        <div v-if="hiddenStore.loaderUpdateInfo === true">
            <!-- <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div> -->
            <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full"></div>
        </div>
        <!-- loader -->

        <div v-if="hiddenStore.loaderUpdateInfo === false">
            <div class="flex items-start  text-gray-500 text-xs">
                <div class="flex  h-5">
                    Текущий пробег
                </div>
                <a class="ms-auto text-blue-700">Обновлен 3 мин назад</a>
            </div>
            <div class="flex items-start">
                <div class="flex items-center h-5">

                    <Vue3Odometer class="text-blue-700 text-md" :value="number" />
                </div>
                <a class="ms-auto text-sm text-blue-700 hover:underline">О</a>
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
const number = ref(100)




const hiddenStore = useComponents();
const userStore = useUser();



defineProps({
    msg: String,
})

userStore.updateInfo()








watch(userStore, () => { //odometr
    axios.get(`https://martynovd.ru/back-api/data/${userStore.userID}`).then((res) => {
        console.log(res.data.info[res.data.info.length - 1][1])
        number.value = res.data.info[res.data.info.length - 1][1] //последний внесенный пробег
    })
})


</script>

<style>
.o-text {
    color: red;
}
</style>