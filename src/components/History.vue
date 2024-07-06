<template>
    <div class="mt-4 mb-2 font-medium">История заправок</div>


    <div class="w-full bg-white border border-gray-200 rounded-lg shadow px-6 pb-4">
        <ol class="relative border-s border-gray-200" v-if="hiddenStore.selectedRange === false">
            <li class="ms-4 mt-4" v-if="userStore.userCost != 0"
                v-for="info, index in userStore.userInfo.slice().reverse()">
                <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                <time class="mb-1 text-sm font-normal leading-none text-gray-400 ">{{ new
                    Date(info[0]).toLocaleString().slice(0, 10)
                    }}</time>

                <div class="flex text-lg font-semibold items-center w-full text-gray-900">
                    <div class="">
                        {{
                            info[1] }}км
                    </div>



                    <div v-if="editData[index]" class="absolute bg-white w-48  max-w-24 ">


                        <div class="relative">
                            <input :placeholder="info[1]" v-model="probeg"
                                class="block w-full pt-6 pe-0 text-sm text-gray-900 border-b-2 focus:outline-none focus:border-blue-600"
                                placeholder="Search" required />
                            <button @click="editProbeg(index)"
                                class="text-black absolute end-5 bottom-0  font-medium rounded-lg text-sm py-1"><svg
                                    class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                </svg>
                            </button>

                            <button @click="editData[index] = false"
                                class="text-black absolute end-0 bottom-0   font-medium rounded-lg text-sm py-1"><svg
                                    class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                            </button>

                        </div>

                        <div class="relative">
                            <input :placeholder="info[2]" v-model="litres"
                                class="block w-full pt-6 pe-0 text-sm text-gray-900 border-b-2 focus:outline-none focus:border-blue-600"
                                placeholder="Search" required />
                            <button @click="editLitres(index)"
                                class="text-black absolute end-5 bottom-0  font-medium rounded-lg text-sm py-1"><svg
                                    class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                </svg>
                            </button>

                            <button @click="editData[index] = false"
                                class="text-black absolute end-0 bottom-0   font-medium rounded-lg text-sm py-1"><svg
                                    class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                            </button>

                        </div>


                    </div>




                    <div class="flex items-center ms-auto">
                        <!-- <a class="px-1.5 rounded-lg"> {{ info[2] }}л
                        </a> -->
                        <a @click="editData[index] = true"
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
                                class="w-[20px] h-[20px] text-gray-800 dark:text-white"
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


        <ol class="relative border-s border-gray-200" v-if="hiddenStore.selectedRange === true">
            <li class="ms-4 mt-4" v-if="userStore.userCost != 0"
                v-for="info, index in userStore.userInfo.slice(enterDate).reverse()">
                <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                <time class="mb-1 text-sm font-normal leading-none text-gray-400 ">{{ new
                    Date(info[0]).toLocaleString().slice(0, 10)
                    }}</time>

                <div class="flex text-lg font-semibold items-center w-full text-gray-900">
                    <div class="">
                        {{
                            info[1] }}км
                    </div>


                    <div v-if="editData[index]" class="absolute bg-white w-48  max-w-24 ">


                        <div class="relative">
                            <input :placeholder="info[1]" v-model="probeg"
                                class="block w-full pt-6 pe-0 text-sm text-gray-900 border-b-2 focus:outline-none focus:border-blue-600"
                                placeholder="Search" required />
                            <button @click="editProbeg(index)"
                                class="text-black absolute end-5 bottom-0  font-medium rounded-lg text-sm py-1"><svg
                                    class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                </svg>
                            </button>

                            <button @click="editData[index] = false"
                                class="text-black absolute end-0 bottom-0   font-medium rounded-lg text-sm py-1"><svg
                                    class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                            </button>

                        </div>

                        <div class="relative">
                            <input :placeholder="info[2]" v-model="litres"
                                class="block w-full pt-6 pe-0 text-sm text-gray-900 border-b-2 focus:outline-none focus:border-blue-600"
                                placeholder="Search" required />
                            <button @click="editLitres(index)"
                                class="text-black absolute end-5 bottom-0  font-medium rounded-lg text-sm py-1"><svg
                                    class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                </svg>
                            </button>

                            <button @click="editData[index] = false"
                                class="text-black absolute end-0 bottom-0   font-medium rounded-lg text-sm py-1"><svg
                                    class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                            </button>

                        </div>


                    </div>


                    <div class="flex items-center ms-auto">
                        <!-- <a class="px-1.5 rounded-lg"> {{ info[2] }}л
                        </a> -->
                        <button @click="editData[index] = true"
                            class="inline-flex items-center px-1.5 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700"><svg
                                class="w-[20px] h-[20px] text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1"
                                    d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                            </svg>
                        </button>
                        <button @click="deleteValue(index)"
                            class="ml-1 inline-flex items-center px-1.5 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700"><svg
                                class="w-[20px] h-[20px] text-gray-800 dark:text-white"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                        </button>
                    </div>




                </div>
                <p class="text-base font-normal text-gray-500 ">{{ info[2] }}л</p>

            </li>
        </ol>


        <div v-if="userStore.userCost === 0"
            class="max-w-2xl p-1 space-y-4 divide-y divide-gray-200 rounded animate-pulse">
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
import { ref, watch } from 'vue';
const hiddenStore = useComponents();
const userStore = useUser();
defineProps({
    msg: String,
})



const editData = ref([])
watch([hiddenStore, userStore], () => {
    editData.value = []
    for (let i = 0; i < userStore.userInfo.length; i++) {
        editData.value.push(false)
    }
    console.log(editData)
    console.log(userStore.userInfo)
})



const probeg = ref()
function editProbeg(value) {
    if (userStore.userID === 1) {
        hiddenStore.showLogin()
    }
    else {
        let info = userStore.userInfo
        info[userStore.userInfo.length - value - 1][1] = probeg.value
        axios.patch(`https://dexone.ru/backend_fuelly/data/${userStore.userID}`, { info: info })
    }
}

const litres = ref()
function editLitres(value) {
    if (userStore.userID === 1) {
        hiddenStore.showLogin()
    }
    else {
        let info = userStore.userInfo
        info[userStore.userInfo.length - value - 1][2] = litres.value
        axios.patch(`https://dexone.ru/backend_fuelly/data/${userStore.userID}`, { info: info })
    }
}







const enterDate = ref(0)
let seconds = Date.now() - 2419200000 // - месяц в милисекундах
for (let i = 0; i < userStore.userInfo.length; i++) {
    if (userStore.userInfo[i][0] > seconds) { //поиск ближайшего наименьшего значения, большего чем seconds и остановка цикла
        enterDate.value = i
        break
    }
}



function deleteValue(value) {
    if (userStore.userID === 1) {
        hiddenStore.showLogin()
    }
    else {
        axios.get(`https://dexone.ru/backend_fuelly/data/${userStore.userID}`).then((res) => {
            let edit = res.data.info

            edit.reverse()
            edit.splice(value, 1)
            edit.reverse()
            axios.patch(`https://dexone.ru/backend_fuelly/data/${userStore.userID}`, { info: edit })
        })
        userStore.updateInfo()
    }
}
</script>