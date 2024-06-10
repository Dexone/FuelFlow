<template>
    <div class="max-w-md mx-auto    justify-center items-center w-full shadow border border-gray-200 rounded-lg mt-3">
        <div class="relative  w-full">
            <div class="relative bg-white rounded-lg ">
                <div class="flex items-center justify-between p-4  border-b rounded-t ">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Обслуживание
                    </h3>
                </div>


                <div v-if="hiddenStore.loaderUpdateInfo === true" role="status"
                    class="max-w-md p-4 space-y-4  divide-y divide-gray-200 rounded animate-pulse  md:p-6">
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
                    <div class="flex items-center justify-between pt-4">
                        <div>
                            <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                            <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
                        </div>
                        <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
                    </div>
                </div>


                <div v-if="hiddenStore.loaderUpdateInfo === false" class="p-4">

                    <div class="flex items-center w-full  px-4 text-gray-500 mt-2" v-for="ob in obsl">
                        <div class="text-sm font-normal">
                            {{ ob.name }}
                        </div>
                        <div class="flex items-center ms-auto space-x-2 rtl:space-x-reverse ">
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
    obsl.value = [
        {
            "name": "Масло АКПП",
            "probeg": userStore.userMasloAKPPCh,
            "forecast": (userStore.userMasloAKPPCh / (userStore.userYearProbeg / 365)).toFixed()
        }, {
            "name": "Свечи",
            "probeg": userStore.userSvechiCh,
            "forecast": (userStore.userSvechiCh / (userStore.userYearProbeg / 365)).toFixed()
        }, {
            "name": "Масло ДВС",
            "probeg": userStore.userMasloCh,
            "forecast": (userStore.userMasloCh / (userStore.userYearProbeg / 365)).toFixed()
        },
        {
            "name": "Топл. фильтр",
            "probeg": userStore.userToplFilterCh,
            "forecast": (userStore.userToplFilterCh / (userStore.userYearProbeg / 365)).toFixed()
        },
        {
            "name": "Торм. жидкость",
            "probeg": userStore.userTormoznCh,
            "forecast": (userStore.userTormoznCh / (userStore.userYearProbeg / 365)).toFixed()
        },
    ]
    obsl.value.sort(function (a, b) {
        return a.probeg - b.probeg;
    });
}

update()

watch(userStore, () => {
    update()
})
</script>