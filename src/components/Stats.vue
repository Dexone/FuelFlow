<template>








    <div class="w-full  max-w-md mx-auto bg-white border border-gray-200  shadow rounded-lg p-5 mb-3">




        <a>
            <img class="rounded-t-lg" :src="picture" alt="" />
        </a>


        <!-- picture loader -->
        <div class="max-w-md  rounded  animate-pulse">
            <div :class="{ 'hidden': pictureLoader }"
                class="flex items-center justify-center h-48 bg-gray-300 rounded-t-lg">
                <svg class="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 16 20">
                    <path
                        d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>
        </div>
        <!-- picture loader -->








        <div class="relative bg-gray-50 p-4 rounded-b-lg border border-gray-200 not-italic">

            <!-- loader -->
            <div v-if="hiddenStore.loaderUpdateInfo === true">
                <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full"></div>
            </div>
            <!-- loader -->





<div v-if="hiddenStore.loaderUpdateInfo === false">
            <div class="flex items-center">

                <div class="flex-1 min-w-0">
                    <p class="text-gray-500 truncate ">
                        Модель
                    </p>
                </div>

                <div class="inline-flex items-center text-base font-medium text-gray-900">
                    {{ userStore.userCar }}
                </div>
            </div>


            <div class="flex items-center  mt-1">

                <div class="flex-1 min-w-0">
                    <p class="text-gray-500 truncate ">
                        Текущий пробег
                    </p>
                </div>

                <div class="inline-flex items-center text-base font-medium text-gray-900">
                    {{ userStore.userProbeg }}км
                </div>
            </div>


            <div class="flex items-center  mt-1">

                <div class="flex-1 min-w-0">
                    <p class="text-gray-500 truncate ">
                        Расход топлива
                    </p>
                </div>

                <div class="inline-flex items-center text-base font-medium text-gray-900">
                    {{ userStore.userRashod }}л/100км
                </div>
            </div>


            <div class="flex items-center  mt-1">

                <div class="flex-1 min-w-0">
                    <p class="text-gray-500 truncate ">
                        Стоимость топлива
                    </p>
                </div>

                <div class="inline-flex items-center text-base font-medium text-gray-900">
                    {{ userStore.userRate }}р
                </div>
            </div>


            <div class="flex items-center mt-1">

                <div class="flex-1 min-w-0">
                    <p class="text-gray-500 truncate ">
                        Годовой пробег
                    </p>
                </div>

                <div class="inline-flex items-center text-base font-medium text-gray-900">
                    {{ userStore.userYearProbeg }}км
                </div>
            </div>
        </div>





        </div>
    </div>
































</template>

<script setup>
import { useUser } from '../../store/User';
import { useComponents } from '../../store/ComponentsHidden';
import { watch, ref } from 'vue';
import axios from 'axios';
const hiddenStore = useComponents();
const userStore = useUser();


const pictureLoader = ref(false) //лоадер картинки

defineProps({
    msg: String,
})

userStore.updateInfo()


watch(userStore, () => {
    updatePicture()
})

const picture = ref()
//  = ref(import.meta.env.BASE_URL + "/src/assets/avatar.png")
function updatePicture() {
    axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDvbL24s32QoD8BbdJj70f62ARqvr9-kRc&searchType=image&cx=e6981af369f6343e2&q=${userStore.userCar}`).then((res) => {
        picture.value = res.data.items[0].link
        pictureLoader.value = true
    })
}

</script>