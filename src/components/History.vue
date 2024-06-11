<template>
    <div class="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow p-6">
        <h5 class="mb-3 text-base font-semibold text-gray-900 text-xl">
            История заправок
        </h5>

        <ul class="my-4 space-y-3">
            <li v-if="hiddenStore.loaderUpdateInfo === false"
                v-for="info, index in userStore.userInfo.slice().reverse()">
                <a
                    class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                    <button @click="deleteValue(index)"
                        class="inline-flex items-center pr-1.5 pt-0.5 text-sm text-gray-400 bg-transparent rounded-sm hover:text-gray-900">
                        <svg class="w-2 h-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                    {{ info[2] }}
                    <span class="flex-1 ms-3 whitespace-nowrap">{{ new Date(info[0]).toLocaleString().slice(0, 10)
                        }}</span>
                    <span
                        class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded">{{
                            info[1] }}</span>
                </a>
            </li>
        </ul>

        <div v-if="hiddenStore.loaderUpdateInfo === true"
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