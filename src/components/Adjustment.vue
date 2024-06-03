<template>
    <!-- Main modal -->
    <div id="authentication-modal" tabindex="-1" aria-hidden="true" :class="{ 'hidden': hiddenStore.showAdjustment }"
        class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-w-md mx-auto">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Настройки
                    </h3>
                    <button type="button"
                        @click="hiddenStore.showAdjustment = !hiddenStore.showAdjustment, hiddenStore.blur = !hiddenStore.blur"
                        class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                        data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>




                    <label class="block mb-2 mx-5 mt-4 text-sm font-medium text-gray-900">Стоимость литра</label>
                    <div class="flex">

                        <div class="relative w-full mx-5 mb-5">
                            <input type="search" id="search-dropdown" v-model="cost" :placeholder="userStore.userCost"
                                class="rounded-s-lg block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                required />

                            <button @click="editValue"
                                class="absolute top-0 end-0 p-1.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">

                                <svg class="w-[24px] h-[24px] text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.3"
                                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>



                            </button>
                        </div>
                    </div>







                    <label class="block mb-2 mx-5 text-sm font-medium text-gray-900">Название авто</label>
                    <div class="flex">
                        <div class="relative w-full mx-5 mb-5">
                            <input type="search" id="search-dropdown" v-model="car" :placeholder="userStore.userCar"
                                class="rounded-s-lg block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                required />

                            <button @click="editCar"
                                class="absolute top-0 end-0 p-1.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">

                                <svg class="w-[24px] h-[24px] text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.3"
                                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg></button>
                        </div>
                    </div>
      




            </div>
        </div>
    </div>


</template>

<script setup>
import { useComponents } from '../../store/ComponentsHidden';
import { ref } from 'vue';
import axios from 'axios';
import { useUser } from '../../store/User';
const userStore = useUser();
const hiddenStore = useComponents();
defineProps({
    msg: String,
})



const cost = ref()
function editValue() {
    if (userStore.userID === 1) {
        alert("Для использования приложения необходимо зарегистрироваться")
    }
    else {
        axios.patch(`https://martynovd.ru/back-api/data/${userStore.userID}`, { cost: cost.value }) //
        userStore.updateInfo()
    }
}

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


</script>