<template>

    <div class="flex items-center mt-4 mb-2 font-medium">

        <div class="w-full">
            Ближайшее обслуживание
        </div>
        <button @click="topFunction()"><svg  class="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
        </svg>
    </button>
    </div>

    <div class="flex ">
        <div class=" bg-white border border-gray-200 rounded-lg shadow p-3 max-w-72">
            <div class="flex items-center gap-4" v-if="userStore.userCost != 0">
                <img v-bind:src="obsl[0].image" width="40">
                <div class="text-gray-400 text-xs font-medium">
                    <div><a class="text-gray-900">{{ obsl[0].name }}</a> через {{ obsl[0].probeg }} км</div>
                    <div class="w-full bg-gray-200 rounded-full h-0.5 mb-1  mt-2">
                        <div v-if="obsl[0].procent > 100" class="bg-blue-600 h-0.5 rounded-full"
                            :style="{ width: 0 + '%' }"></div>
                        <div v-else class="bg-blue-600 h-0.5 rounded-full" :style="{ width: obsl[0].procent + '%' }">
                        </div>
                    </div>

                </div>

            </div>
            <!-- loader -->
            <div v-if="userStore.userCost === 0"
                class="max-w-2xl p-0.5 space-y-4  divide-y divide-gray-200 rounded animate-pulse">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="h-2.5 bg-gray-300 rounded-full w-18 mb-2.5"></div>
                        <div class="w-24 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-8"></div>
                </div>
            </div>
            <!-- loader -->

        </div>













        <div class=" bg-white border border-gray-200 rounded-lg shadow p-3 max-w-72 ml-3">
            <div class="flex items-center gap-4" v-if="userStore.userCost != 0">
                <img v-bind:src="obsl[1].image" width="40">
                <div class="text-gray-400 text-xs font-medium">
                    <div><a class="text-gray-900">{{ obsl[1].name }}</a> через {{ obsl[1].probeg }} км</div>
                    <div class="w-full bg-gray-200 rounded-full h-0.5 mb-1  mt-2">
                        <div v-if="obsl[1].procent > 100" class="bg-blue-600 h-0.5 rounded-full"
                            :style="{ width: 0 + '%' }"></div>
                        <div v-else class="bg-blue-600 h-0.5 rounded-full" :style="{ width: obsl[1].procent + '%' }">
                        </div>
                    </div>

                </div>

            </div>
            <!-- loader -->
            <div v-if="userStore.userCost === 0"
                class="max-w-2xl p-0.5 space-y-4  divide-y divide-gray-200 rounded animate-pulse">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="h-2.5 bg-gray-300 rounded-full w-18 mb-2.5"></div>
                        <div class="w-24 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-8"></div>
                </div>
            </div>
            <!-- loader -->

        </div>










        <!-- 
        <div class="p-3.5 mt-3 inline-flex" @click="topFunction()"> -->
        <!-- <svg class="w-6 h-6 text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10" />
        </svg> -->
        <!-- <button class="text-blue-600">Еще {{ obsl.length - 1 }}</button>
        </div> -->

    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useComponents } from '../../store/ComponentsHidden';
import { useUser } from '../../store/User';
defineProps({
    msg: String,
})
const hiddenStore = useComponents();
const userStore = useUser();

const obsl = ref()

function update() {
    if (userStore.userInfo.length >= 2) {
        let userMasloCh = 6000 - (userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userMaslo)
        let userSvechiCh = 30000 - (userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userSvechi)
        let userMasloAKPPCh = 30000 - (userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userMasloAKPP)
        let userToplFilterCh = 30000 - (userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userToplFilter)
        let userTormoznCh = 30000 - (userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userTormozn)
        let yearProbeg = (((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userInfo[0][1]) / ((userStore.userInfo[userStore.userInfo.length - 1][0] - userStore.userInfo[0][0]) / 1000 / 60 / 60)) * 24) //средний пробег в час

        obsl.value = [
            {
                "name": "Масло АКПП",
                "probeg": userMasloAKPPCh,
                "forecast": (userMasloAKPPCh / (yearProbeg)).toFixed(),
                "image": import.meta.env.BASE_URL + "/obsl.pictures/akpp.png",
                "procent": ((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userMasloAKPP) / 30000 * 100).toFixed()
            }, {
                "name": "Свечи",
                "probeg": userSvechiCh,
                "forecast": (userSvechiCh / (yearProbeg)).toFixed(),
                "image": import.meta.env.BASE_URL + "/obsl.pictures/svechi.png",
                "procent": ((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userSvechi) / 30000 * 100).toFixed()

            }, {
                "name": "Масло ДВС",
                "probeg": userMasloCh,
                "forecast": (userMasloCh / (yearProbeg)).toFixed(),
                "image": import.meta.env.BASE_URL + "/obsl.pictures/maslo.png",
                "procent": ((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userMaslo) / 6000 * 100).toFixed()
            },
            {
                "name": "Топл. фильтр",
                "probeg": userToplFilterCh,
                "forecast": (userToplFilterCh / (yearProbeg)).toFixed(),
                "image": import.meta.env.BASE_URL + "/obsl.pictures/filter.png",
                "procent": ((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userToplFilter) / 30000 * 100).toFixed()
            },
            {
                "name": "Торм. жидкость",
                "probeg": userTormoznCh,
                "forecast": (userTormoznCh / (yearProbeg)).toFixed(),
                "image": import.meta.env.BASE_URL + "/obsl.pictures/tormozn.png",
                "procent": ((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userTormozn) / 30000 * 100).toFixed()
            },
        ]
        obsl.value.sort(function (a, b) {
            return a.probeg - b.probeg;
        });
    }
    else {

        obsl.value = [
            {
                "name": "Масло АКПП",
                "probeg": 0,
                "forecast": 0,
                "image": import.meta.env.BASE_URL + "/obsl.pictures/akpp.png",
                "procent": 0
            }, {
                "name": "Свечи",
                "probeg": 0,
                "forecast": 0,
                "image": import.meta.env.BASE_URL + "/obsl.pictures/svechi.png",
                "procent": 0
            }, {
                "name": "Масло ДВС",
                "probeg": 0,
                "forecast": 0,
                "image": import.meta.env.BASE_URL + "/obsl.pictures/akpp.png",
                "procent": 0
            },
            {
                "name": "Топл. фильтр",
                "probeg": 0,
                "forecast": 0,
                "image": import.meta.env.BASE_URL + "/obsl.pictures/akpp.png",
                "procent": 0
            },
            {
                "name": "Торм. жидкость",
                "probeg": 0,
                "forecast": 0,
                "image": import.meta.env.BASE_URL + "/obsl.pictures/akpp.png",
                "procent": 0
            },
        ]
    }
}
update()
watch(userStore, () => {
    update()
})

function topFunction() {
    window.scrollTo({
        top: 2000,
        behavior: 'smooth'
    })
}
</script>