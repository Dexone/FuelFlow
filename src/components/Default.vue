<template>








    <div class="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 ">
        <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl ">
            История заправок
        </h5>
        <!-- <p class="text-sm font-normal text-gray-500 ">Connect with one of our available wallet
                providers or create a new one.</p> -->
        <ul class="my-4 space-y-3">


            <li v-for="info, index in userStore.userInfo.slice().reverse()">

                <a
                    class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                    <button @click="deleteValue(index)"
                        class="inline-flex items-center pr-1.5 pt-0.5 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900">
                        <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                    {{ info[2] }}
                    <span class="flex-1 ms-3 whitespace-nowrap">{{ new Date(info[0]).toLocaleString().slice(0, 10)
                        }}</span>
                    <span
                        class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded ">{{
                            info[1] }}</span>

                </a>

            </li>

        </ul>
        <!-- <div>
                <a class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline ">
                    <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Удалить последнее значение</a>
            </div> -->
    </div>





</template>



<script setup>
import { useUser } from '../../store/User';
import { useComponents } from '../../store/ComponentsHidden';
import { watch, ref } from 'vue';
import axios from 'axios';
const hiddenStore = useComponents();
const userStore = useUser();
defineProps({
    msg: String,
})



function deleteValue(value) {
    if (userStore.userID === 1) {
        alert("Для использования приложения необходимо зарегистрироваться")
    }
    else {
        axios.get(`https://martynovd.ru/back-api/data/${userStore.userID}`).then((res) => {
            let edit = res.data.info
            edit.splice(value, 1)
            axios.patch(`https://martynovd.ru/back-api/data/${userStore.userID}`, { info: edit })
        })
        userStore.updateInfo()
    }
}



</script>