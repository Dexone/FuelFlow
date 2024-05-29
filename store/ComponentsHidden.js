import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue'

export const useComponents = defineStore('hiddenStore', {
    state: () => ({ showLogin: true }),
    getters: {
    },
    actions: {

    },
});