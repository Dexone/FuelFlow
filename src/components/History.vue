<template>


















    <div class="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow p-6 mt-3">
        <h5 class="mb-3 text-base font-semibold text-gray-900 text-xl">
            История заправок
        </h5>


        <ol class="relative border-s border-gray-200">

            <li class="ms-4 mt-4" v-if="userStore.userCost != 0" v-for="info, index in userStore.userInfo.slice().reverse()">
                <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                <time class="mb-1 text-sm font-normal leading-none text-gray-400 ">{{ new
                    Date(info[0]).toLocaleString().slice(0, 10)
                    }}</time>

                <div class="flex text-lg font-semibold items-center w-full text-gray-900">
                    <div class="">
                        {{
                            info[1] }}км
                    </div>

                    <div class="flex items-center ms-auto">
                        <!-- <a class="px-1.5 rounded-lg"> {{ info[2] }}л
                        </a> -->
                        <a onclick="alert('В разработке')"
                            class="inline-flex items-center px-1.5 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700"><svg
                                class="w-[20px] h-[20px] text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1"
                                    d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                            </svg>

                        </a>
                        <a @click="deleteValue(index)"
                            class="ml-1 inline-flex items-center px-1.5 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700"><svg
                                class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>


                        </a>
                    </div>
                </div>
                <p class="text-base font-normal text-gray-500 ">{{ info[2] }}л</p>
            </li>
        </ol>


        <div v-if="userStore.userCost === 0"
            class="max-w-md p-1 space-y-4 divide-y divide-gray-200 rounded animate-pulse">
            <div class="flex items-center justify-between">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full "></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full "></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full  w-12"></div>
            </div>
            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full "></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full  w-12"></div>
            </div>
            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full "></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full  w-12"></div>
            </div>
            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full "></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full  w-12"></div>
            </div>
        </div>

    </div>
</template>



<script setup>
import { useUser } from '../../store/User';
import { useComponents } from '../../store/ComponentsHidden';
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

            edit.reverse()
            edit.splice(value, 1)
            edit.reverse()
            axios.patch(`https://martynovd.ru/back-api/data/${userStore.userID}`, { info: edit })
        })
        userStore.updateInfo()
    }
}

</script>