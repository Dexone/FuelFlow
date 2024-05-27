<template>



    <!-- Main modal -->
    <div id="authentication-modal" tabindex="-1" aria-hidden="true" :class="{ 'hidden': hiddenStore.showLogin }"
        class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Авторизация
                    </h3>
                    <button type="button" @click="hiddenStore.showLogin = !hiddenStore.showLogin"
                        class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                        data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>


                <!-- Login -->
                <div class="p-4 md:p-5" v-if="logOrReg == 'log' && userStore.user == 1">
                    <form class="space-y-4" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Логин</label>
                            <input type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Dexone" required />
                        </div>

                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Пароль</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>

                        <button type="submit"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Войти</button>
                        <div class="text-sm font-medium text-gray-500">
                            Не зарегистрированы?<a href="#" @click="logOrReg = 'reg'"
                                class="text-blue-700 hover:underline"> Создать аккаунт</a>
                        </div>
                    </form>
                </div>


                <!-- Registration -->
                <div class="p-4 md:p-5" v-if="logOrReg == 'reg' && userStore.user == 1">
                    <form class="space-y-4" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Логин</label>
                            <input type="email" name="email" id="email" v-model="regData[0]"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Dexone" required />
                        </div>

                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Пароль</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                v-model="regData[1]"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>

                        <button type="submit" @click="userStore.registration(regData)"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Создать
                            аккаунт</button>
                        <div class="text-sm font-medium text-gray-500">
                            Уже есть аккаунт?<a href="#" @click="logOrReg = 'log'"
                                class="text-blue-700 hover:underline"> Войти</a>
                        </div>
                    </form>
                </div>





                <!-- Account -->
                <div class="flex flex-col items-center pb-10 pt-10" v-if="userStore.user > 1">
                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="" alt="Bonnie image" />
                    <h5 class="mb-1 text-xl font-medium text-gray-900">Bonnie Green</h5>
                    <span class="text-sm text-gray-500">Visual Designer</span>
                    <div class="flex mt-4 md:mt-6">
                        <a href="#"
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Add
                            friend</a>
                        <a href="#"
                            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Message</a>
                    </div>
                </div>


















                {{ userStore.user }}

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
const logOrReg = ref('reg')

const regData = ref([])










</script>