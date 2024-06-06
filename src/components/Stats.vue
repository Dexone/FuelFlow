<template>
    <div class="w-full   mt-3 max-w-md mx-auto bg-white border border-gray-200  shadow rounded-lg p-5 mb-3 ">
        <!-- <h2 class="text-lg font-semibold text-gray-900  mb-2">Статистика</h2> -->
        <a href="#">
            <img class="rounded-t-lg" :src="picture" alt="" />
        </a>

        <div class="relative bg-gray-50 p-4 rounded-b-lg border border-gray-200 not-italic grid grid-cols-2">

            <div class="space-y-2 text-gray-500  leading-loose sm:block">
                Модель<br />
                Текущий пробег<br />
                Расход топлива<br />
                Стоимость топлива <br />
                Годовой пробег
            </div>

            <div class="space-y-2 text-gray-900  font-medium leading-loose">

                {{ userStore.userCar }} <br />
                {{ userStore.userProbeg }} км. <br />
                {{ userStore.userRashod }} л./100км. <br />
                {{ userStore.userRate }} р./мес. <br />
                {{ userStore.userYearProbeg }} км.
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

defineProps({
    msg: String,
})

userStore.updateInfo()





watch(userStore, () => {
    updatePicture()
})
const picture = ref()
function updatePicture() {
    axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDvbL24s32QoD8BbdJj70f62ARqvr9-kRc&searchType=image&cx=e6981af369f6343e2&q=${userStore.userCar}`).then((res) => {
        picture.value = res.data.items[0].link
        console.log(picture.value)


    })
}
</script>