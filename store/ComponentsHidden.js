import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, watch } from 'vue'

export const useComponents = defineStore('hiddenStore', {
    state: () => ({ showLogin: true, showAdd: true, showAdjustment: true, showObsl: true }),
}
);
