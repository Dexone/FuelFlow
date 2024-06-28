<template>


    <div class="mt-4 mb-2 font-medium">Обслуживание</div>
    <div class="w-full  bg-white border border-gray-200 rounded-lg shadow px-6 py-2 ">
        <div class="flex items-center my-4" v-for="ob in obsl" v-if="userStore.userCost != 0">
            <img v-bind:src="ob.image" width="40">
            <div class="w-[2000px] ml-2 mx-6 -mt-2 text-gray-900 text-sm font-medium ">
                {{ ob.name }} <a class="text-gray-400 text-xs">{{
                    ob.probeg }} км</a>
                <div class=" bg-gray-200 rounded mt-3">
                    <div v-if="ob.procent > 100" class="h-0.5 bg-blue-600 rounded-full" :style="{ width: 0 + '%' }"></div>
                    <div v-else class="h-0.5 bg-blue-600 rounded-full" :style="{ width: ob.procent + '%' }"></div>
                </div>
            </div>
            <span class="text-sm font-medium  font-medium text-gray-900 min-w-12">{{ ob.forecast }} дн</span>
        </div>



        <div v-if="userStore.userCost === 0"
            class="max-w-2xl p-4 space-y-4  divide-y divide-gray-200 rounded animate-pulse  p-6">
            <div class="flex items-center justify-between">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>


            <div class="flex items-center justify-between pt-4">
                <div>
                    <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                </div>
                <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
            </div>
        </div>



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
        obsl.value = 0
    }
}
update()
watch(userStore, () => {
    update()
})
</script>