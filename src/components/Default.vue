<template>
 



    <div
        class="w-full max-w-md mx-auto bg-white border border-gray-200  shadow rounded-lg p-5 mb-3">
        <h2 class="text-lg font-semibold text-gray-900  mb-2">Статистика</h2>
        <div
            class="relative bg-gray-50   p-4 rounded-lg border border-gray-200 not-italic grid grid-cols-2">
            <div class="space-y-2 text-gray-500  leading-loose sm:block">
                Модель<br />
                Текущий пробег<br />
                Расход топлива<br />
                Стоимость топлива
            </div>
            <div  class="space-y-2 text-gray-900  font-medium leading-loose">
                Kia Rio <br />
                {{ userStore.userProbeg }} км. <br />
                {{ Math.round(userStore.userRashod) }} л./100км. <br />

                {{ Math.round(userStore.userRate) }} р./мес.
            </div>
            <!-- <button data-copy-to-clipboard-target="contact-details" data-copy-to-clipboard-content-type="textContent"
                data-tooltip-target="tooltip-contact-details"
                class="absolute end-2 top-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center">
                <span id="default-icon-contact-details">
                    <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 18 20">
                        <path
                            d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                </span>
                <span id="success-icon-contact-details" class="hidden inline-flex items-center">
                    <svg class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                </span>
            </button> -->
            <!-- <div id="tooltip-contact-details" role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                <span id="default-tooltip-message-contact-details">Copy to clipboard</span>
                <span id="success-tooltip-message-contact-details" class="hidden">Copied!</span>
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div> -->
        </div>
    </div>







    <div
        class="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 ">
        <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl ">
            История заправок
        </h5>
        <p class="text-sm font-normal text-gray-500 ">Connect with one of our available wallet
            providers or create a new one.</p>
        <ul class="my-4 space-y-3">


            <li v-for="info in userStore.userInfo.slice().reverse()">
                <a href="#"
                    class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow  ">
                    {{ info[2] }}л.
                    <span class="flex-1 ms-3 whitespace-nowrap">{{ new Date(info[0]).toLocaleString().slice(0, 10)
                        }}</span>
                    <span
                        class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded ">{{
                            info[1] }} км.</span>
                </a>
            </li>

        </ul>
        <div>
            <a href="#"
                class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline ">
                <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Удалить последнее значение</a>
        </div>
    </div>





</template>



<script setup>
import { useUser } from '../../store/User';
const userStore = useUser();
defineProps({
    msg: String,
})

userStore.updateInfo()



</script>