<template>
  <aside 
    class="fixed top-0  z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
    aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 rounded-lg mt-5">
      <ul class="space-y-2 font-medium">
        
        <li>
          <a @click="topFunction()"
            class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
            <svg class="w-5 h-5 text-gray-500  group-hover:text-blue-600 " xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
            <button class="ms-3">Домой</button>
          </a>
        </li>

        <li>
          <a @click="hiddenStore.showObsl()"
            class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-blue-600  "
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path
                d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            <button class="ms-3">Обслуживание</button>

          </a>
        </li>

        <li>
          <a @click="hiddenStore.showAdd()"
            class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-blue-600 "
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
              <path
                d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
              <path
                d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
            </svg>
            <button class="ms-3">Добавить</button>
            <span
            class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full ">+</span>
          </a>
        </li>

        <li>
          <a @click="hiddenStore.showAdjustment()"
            class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group">
            <svg class="w-5 h-5 text-gray-500  group-hover:text-blue-600 " xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                </svg>
            <button class="ms-3">Настройки</button>
          </a>
        </li>
        <li>
          <a @click="hiddenStore.showLogin()"
            class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-blue-600 "
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path
                d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <button class="ms-3">Авторизация</button>
            <span
            class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full  ">3</span>
          </a>
        </li>

      </ul>
    </div>
  </aside>
</template>


<script setup>
import axios from 'axios'
import Chart from 'chart.js/auto';
import { LineChart } from "vue-chart-3"
import { computed, watch, ref, reactive } from 'vue'
import { useUser } from '../../store/User';
import { useComponents } from '../../store/ComponentsHidden';
const hiddenStore = useComponents();
const userStore = useUser();
defineProps({
    msg: String,
})


function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>