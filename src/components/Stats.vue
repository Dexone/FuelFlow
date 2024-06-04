<template>
    <div class="w-full max-w-md mx-auto bg-white border border-gray-200  shadow rounded-lg p-5 mb-3 ">
        <h2 class="text-lg font-semibold text-gray-900  mb-2">Статистика</h2>
        <div class="relative bg-gray-50   p-4 rounded-lg border border-gray-200 not-italic grid grid-cols-2">
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
</script>