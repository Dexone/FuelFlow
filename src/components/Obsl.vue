<template>
    <div class="justify-center items-center w-full shadow border border-gray-200 rounded-lg mt-3">
        <div class="relative w-full">
            <div class="relative bg-white rounded-lg">
                <div class="flex items-center justify-between p-4 border-b rounded-t">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Обслуживание
                    </h3>
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

                <div v-if="userStore.userCost != 0" class="p-4">
                    <div class="flex items-center w-full px-4 text-gray-500 mt-2" v-for="ob in obsl">
                        <div class="text-sm font-normal">
                            {{ ob.name }}
                        </div>
                        <div class="flex items-center ms-auto">
                            <a v-if="ob.probeg <= 0" class="text-sm font-medium p-1.5 rounded-lg text-red-600"> {{
                                ob.probeg }}км ~{{ ob.forecast }}дн
                            </a>

                            <a v-if="ob.probeg > 0" class="text-sm font-medium p-1.5 rounded-lg"> {{
                                ob.probeg }}км <a class="text-blue-600">~{{ ob.forecast }}дн</a>
                            </a>
                        </div>
                    </div>
                </div>
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
    if (userStore.userInfo.length >= 1) {
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
                "forecast": (userMasloAKPPCh / (yearProbeg)).toFixed()
            }, {
                "name": "Свечи",
                "probeg": userSvechiCh,
                "forecast": (userSvechiCh / (yearProbeg)).toFixed()
            }, {
                "name": "Масло ДВС",
                "probeg": userMasloCh,
                "forecast": (userMasloCh / (yearProbeg)).toFixed()
            },
            {
                "name": "Топл. фильтр",
                "probeg": userToplFilterCh,
                "forecast": (userToplFilterCh / (yearProbeg)).toFixed()
            },
            {
                "name": "Торм. жидкость",
                "probeg": userTormoznCh,
                "forecast": (userTormoznCh / (yearProbeg)).toFixed()
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