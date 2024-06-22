<template>
    <div :class="{ 'hidden': hiddenStore.showAdd }"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-[calc(100%-1rem)] max-h-[470px] max-w-2xl mx-auto">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow">
                <div class="flex items-center justify-between p-4 p-5 border-b rounded-t">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Заправка
                    </h3>
                    <button 
                        @click="hiddenStore.showAdd = !hiddenStore.showAdd, hiddenStore.blur = !hiddenStore.blur"
                        class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>

                <div class="p-4 p-5">
                    <a class="space-y-4">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Кол-во литров</label>
                            <input type="search" v-model="litres"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        </div>


                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Пробег</label>
                            <input type="search" v-model="probeg"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        </div>

                        <button @click="addValue"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Внести
                            заправку</button>
                    </a>
                </div>

            </div>
        </div>
    </div>
</template>


<script setup>
import { useComponents } from '../../store/ComponentsHidden';
import { useUser } from '../../store/User';
const hiddenStore = useComponents();
const userStore = useUser();
import axios from 'axios';
import { ref } from 'vue'

const probeg = ref()
const litres = ref()

function addValue() {
    if (userStore.userID === 1) {
        alert("Для использования приложения необходимо зарегистрироваться")
    }
    else {
        axios.get(`https://martynovd.ru/back-api/data/${userStore.userID}`).then((res) => {
            let seconds = Date.now()
            let updInfo = res.data.info
            updInfo.push([seconds, probeg.value, litres.value])
            axios.patch(`https://martynovd.ru/back-api/data/${userStore.userID}`, { info: updInfo }) //
        })
        userStore.updateInfo()
        hiddenStore.showAdd = true
    }
}

</script>