import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, watch } from 'vue'

export const useComponents = defineStore('hiddenStore', {
    state: () => ({ login: true, add: true, adjustment: true, obsl: true, selectedRange: false }),
    actions: {
        showLogin() {
            this.login = !this.login
            this.add = true
            this.adjustment = true
            this.obsl = true
        },
        showAdd() {
            this.add = !this.add
            this.login = true
            this. adjustment = true
            this.obsl = true
        },
        showAdjustment(){
            this.adjustment = !this.adjustment
            this.login = true
            this.add = true
            this.obsl = true
        },
        showObsl(){
            this.obsl = !this.obsl
            this.login = true
            this.add = true
            this.adjustment = true
        }
    }
}
)
