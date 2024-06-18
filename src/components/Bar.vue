<template>
    <div
        class="fixed bottom-0 z-50 w-full h-16 -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">

        <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
            <button @click="topFunction()"
                class="inline-flex flex-col items-center justify-center px-5  hover:bg-gray-50">
                <svg class="w-5 h-5 mb-1 text-gray-500  group-hover:text-blue-600 " xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
            </button>

            <button @click="userStore.updateInfo(), sync()"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group">
                <svg class="w-[27px] h-[27px] mb-1 text-gray-500  group-hover:text-blue-600 " aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                </svg>
            </button>

            <div class="flex items-center justify-center">
                <button @click="hiddenStore.showAdd = !hiddenStore.showAdd"
                    class="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none">
                    <svg class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>

            <button @click="hiddenStore.showAdjustment = !hiddenStore.showAdjustment"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 ">
                <svg class="w-5 h-5 mb-1 text-gray-500  group-hover:text-blue-600 " xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                </svg>
            </button>

            <button @click="hiddenStore.showLogin = !hiddenStore.showLogin"
                class="inline-flex flex-col items-center justify-center px-5  hover:bg-gray-50 ">
                <svg class="w-5 h-5 mb-1 text-gray-500  group-hover:text-blue-600 " xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>

            </button>

        </div>
    </div>
</template>





<script setup>
import { watch } from 'vue'
import { useComponents } from '../../store/ComponentsHidden';
import { useUser } from '../../store/User';
import axios from 'axios'
const hiddenStore = useComponents();
const userStore = useUser();

defineProps({
    msg: String,
})

watch(hiddenStore, () => {
    hiddenStore.blurEdit()
})

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

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