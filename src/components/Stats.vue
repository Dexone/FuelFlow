<template>


    <!-- loader -->
    <!-- <div class=" flex items-center justify-center mx-auto w-56 h-[100px] rounded-lg"
                    v-if="userStore.userCost === 0">
                    <svg class="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                </div> -->
    <!-- loader -->




    <div :class="{ 'hidden': showEditCar }"
        class=" fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-w-md mx-auto">


        <div v-if="userStore.userCost != 0">



            <form>
                <div class="flex">

                    <button @click="showEditCar = !showEditCar"
                        class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        type="button">X</button>



                    <div class="relative w-full">
                        <input v-model="car" :placeholder="userStore.userCar"
                            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500">
                        <button  @click="editCar"
                            class="absolute top-0 end-0 p-1.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">                        <svg class="w-[24px] h-[24px] text-white" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.3"
                                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg></button>
                    </div>
                </div>
            </form>









        </div>





    </div>









    <!-- fdfdfdf -->
    <div class="flex items-start font-semibold text-gray-900 text-2xl mt-3 max-w-md mx-auto">
        <div class="flex h-5">
            {{ userStore.userCar }}
        </div>
        <button @click="showEditCar = !showEditCar" class="ms-auto text-blue-700 mt-1">
            <svg class="w-6 h-6 text-blue-700 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
            </svg>
        </button>
    </div>
    <div class="flex items-start max-w-md mx-auto">
        <div class="flex items-center h-5 text-gray-500 text-xs" v-if="userStore.userInfo.length < 1">
            Недостаточно данных
        </div>
        <div class="flex items-center h-5 text-gray-500 text-xs" v-if="userStore.userInfo.length >= 1">
            {{ new Date(userStore.userInfo[0][0]).toLocaleString().slice(0, 10) }} - {{ new
                Date(userStore.userInfo[userStore.userInfo.length - 1][0]).toLocaleString().slice(0, 10) }}
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


const showEditCar = ref(true)



const car = ref()
function editCar() {
    if (userStore.userID === 1) {
        alert("Для использования приложения необходимо зарегистрироваться")
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


</script>
