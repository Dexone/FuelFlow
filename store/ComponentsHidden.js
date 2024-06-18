import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, watch } from 'vue'

export const useComponents = defineStore('hiddenStore', {
    state: () => ({ showLogin: true, showAdd: true, showAdjustment: true, showEditCar: true, blur: false }),
    getters: {

    },
    actions: {
        blurEdit() {
            if (this.showLogin == false || this.showAdd == false || this.showAdjustment == false, this.showEditCar == false) {
                this.blur = true
            }
            else {
                this.blur = false
            }
        }
    },
}
);
