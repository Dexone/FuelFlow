<template>
    <div class="flex mx-auto max-w-2xl">

        <div class="bg-white border border-gray-200 rounded-lg shadow p-3 mt-3 max-w-60">
            <div class="flex items-center gap-4">
                <svg class="w-6 h-6 text-purple-500 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M9.586 2.586A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2v.089l.473.196.063-.063a2.002 2.002 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.827l-.063.064.196.473H20a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.089l-.196.473.063.063a2.002 2.002 0 0 1 0 2.828l-1.414 1.414a2 2 0 0 1-2.828 0l-.063-.063-.473.196V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.089l-.473-.196-.063.063a2.002 2.002 0 0 1-2.828 0l-1.414-1.414a2 2 0 0 1 0-2.827l.063-.064L4.089 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.09l.195-.473-.063-.063a2 2 0 0 1 0-2.828l1.414-1.414a2 2 0 0 1 2.827 0l.064.063L9 4.089V4a2 2 0 0 1 .586-1.414ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                        clip-rule="evenodd" />
                </svg>
                <div class="text-gray-400 text-xs font-medium">
                    <div><a class="text-gray-900">Замена масла</a> через {{ obsl[0].probeg }} км</div>
                    <div class="w-full bg-gray-200 rounded-full h-0.5 mb-1  mt-2">
                        <div v-if="obsl[0].procent > 100" class="bg-blue-600 h-0.5 rounded-full"
                            :style="{ width: 0 + '%' }"></div>
                    <div v-else class="bg-blue-600 h-0.5 rounded-full" :style="{ width: obsl[0].procent + '%' }"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="p-3.5 mt-3 inline-flex" @click="topFunction()">
        <svg class="w-6 h-6 text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10" />
        </svg>
        <button class="text-blue-600">Еще {{ obsl.length - 1 }}</button>
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

        let userMasloProcent = ((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userMaslo) / 6000 * 100).toFixed()
        let userSvechiProcent = ((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userSvechi) / 30000 * 100).toFixed()
        let userMasloAKPPProcent = ((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userMasloAKPP) / 30000 * 100).toFixed()
        let userToplFilterProcent = ((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userToplFilter) / 30000 * 100).toFixed()
        let userTormoznProcent = ((userStore.userInfo[userStore.userInfo.length - 1][1] - userStore.userTormozn) / 30000 * 100).toFixed()

        obsl.value = [
            {
                "name": "Масло АКПП",
                "probeg": userMasloAKPPCh,
                "procent": userMasloAKPPProcent
            }, {
                "name": "Свечи",
                "probeg": userSvechiCh,
                "procent": userSvechiProcent
            }, {
                "name": "Масло ДВС",
                "probeg": userMasloCh,
                "procent": userMasloProcent
            },
            {
                "name": "Топл. фильтр",
                "probeg": userToplFilterCh,
                "procent": userToplFilterProcent
            },
            {
                "name": "Торм. жидкость",
                "probeg": userTormoznCh,
                "procent": userTormoznProcent
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
                "procent": 0
            }, {
                "name": "Свечи",
                "probeg": 0,
                "procent": 0
            }, {
                "name": "Масло ДВС",
                "probeg": 0,
                "procent": 0
            },
            {
                "name": "Топл. фильтр",
                "probeg": 0,
                "procent": 0
            },
            {
                "name": "Торм. жидкость",
                "probeg": 0,
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