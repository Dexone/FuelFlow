<template>














    <!-- Modal toggle -->


    <!-- Main modal -->
    <div
        class="max-w-md mx-auto    justify-center items-center w-full shadow border border-gray-200 rounded-lg mb-24 mt-3">
        <div class="relative  w-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg ">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4  border-b rounded-t ">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Обслуживание
                    </h3>
                </div>












                <div v-if="hiddenStore.loaderUpdateInfo === true" role="status"
                    class="max-w-md p-4 space-y-4  divide-y divide-gray-200 rounded animate-pulse  md:p-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div class="flex items-center justify-between pt-4">
                        <div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div class="flex items-center justify-between pt-4">
                        <div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <!-- <div class="flex items-center justify-between pt-4">
                        <div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div class="flex items-center justify-between pt-4">
                        <div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div> -->
                    <span class="sr-only">Loading...</span>
                </div>










                <div v-if="hiddenStore.loaderUpdateInfo === false" class="p-4 space-y-4">
                    <div class="flex items-center w-full  px-4 text-gray-500">
                        <div class="text-sm font-normal">
                            Замена масла
                        </div>
                        <div class="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
                            <a class="text-sm font-medium text-blue-600 p-1.5 rounded-lg"> {{
                                userStore.userMasloCh }}</a>
                        </div>
                    </div>

                    <div class="flex items-center w-full  px-4 text-gray-500">
                        <div class="text-sm font-normal">
                            Замена свечей
                        </div>
                        <div class="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
                            <a class="text-sm font-medium text-blue-600 p-1.5 rounded-lg"> {{
                                userStore.userSvechiCh }}</a>
                        </div>
                    </div>



                    <div class="flex items-center w-full  px-4 text-gray-500">
                        <div class="text-sm font-normal">
                            Масло АКПП
                        </div>
                        <div class="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
                            <a class="text-sm font-medium text-blue-600 p-1.5 rounded-lg"> {{
                                userStore.userMasloAKPPCh }}
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
















</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useComponents } from '../../store/ComponentsHidden';
import { useUser } from '../../store/User';
defineProps({
    msg: String,
})
const hiddenStore = useComponents();
const userStore = useUser();
</script>