<template>
    <div :class="{ 'hidden': hiddenStore.adjustment }"
        class=" fixed top-0 right-0 sm:left-40 z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)]  max-w-2xl mx-auto ">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="max-h-[450px] overflow-auto relative bg-white rounded-lg shadow">
                <div class="flex items-center justify-between p-4 p-5 border-b rounded-t">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Настройки
                    </h3>
                    <button @click="hiddenStore.showAdjustment()"
                        class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>

                <!-- loader -->
                <div class=" flex items-center justify-center mx-auto w-56 h-[450px] rounded-lg"
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
                </div>
                <!-- loader -->

                <div v-if="userStore.userCost != 0">

                    <label class="block mb-2 mx-5 mt-4 text-sm font-medium text-gray-900">Стоимость литра</label>
                    <div class="flex">
                        <div class="relative w-full mx-5 mb-5">
                            <input type="search" v-model="cost" :placeholder="userStore.userCost"
                                class="rounded-s-lg block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                            <button @click="editValue"
                                class="absolute top-0 end-0 p-1.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">

                                <svg class="w-[24px] h-[24px] text-white" xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.3"
                                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div v-if="userStore.userCost != 0">
                <div class="flex items-start  text-sm font-medium text-gray-900  mx-5 mb-5">
                    <div class="flex  h-5">
                        Cкрывать старые данные
                    </div>
                    <a class="ms-auto text-gray-400 text-xs">                
                        
                        <label v-if="userStore.userCost != 0" class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" v-model="hiddenStore.selectedRange">
                    <div
                        class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-blue-600">
                    </div>
                </label>
            </a>
                </div>
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
        hiddenStore.showLogin()
    }
    else {
        axios.patch(`https://dexone.ru/backend_fuelly/data/${userStore.userID}`, { cost: cost.value }) //
        userStore.updateInfo()
    }
}

</script>