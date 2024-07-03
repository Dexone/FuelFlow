import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue'
import { useComponents } from './ComponentsHidden';

export const useUser = defineStore('userStore', {
    state: () => ({
        userID: 1, userLogin: "guest", userCost: 0, userInfo: [], userCar: " ", userMaslo: "0", userSvechi: "0", userMasloAKPP: "0", userToplFilter: "0", userTormozn: "0",
    }
    ),
    getters: {
    },
    actions: {
        updateInfo() {
            this.userCost = 0 //для лоадера компонентов
            setTimeout(() => {

                axios.get(`https://dexone.ru/backend_fuelly/data/${this.userID}`).then((res) => {

                    //расход бензина на 100км
                    if (res.data.info.length > 1) { //если более 1 записи в истории заправок
                        let rashod = 0
                        let count = 0
                        for (let i = 1; i < res.data.info.length; i++) {
                            rashod = rashod + (res.data.info[i][2] / (res.data.info[i][1] - res.data.info[i - 1][1]) * 100)
                            count++
                        }
                        //

                        this.userCost = res.data.cost //стоимость литра топлива
                        this.userCar = res.data.car //модель машины
                        this.userMaslo = res.data.maslo //пробег последней замены масла
                        this.userSvechi = res.data.svechi //пробег последней замены свечей
                        this.userTormozn = res.data.tormozn //пробег последней торм жидкости
                        this.userToplFilter = res.data.toplFilter //пробег последней замены топл фильтра
                        this.userMasloAKPP = res.data.masloAKPP //пробег последней замены масла акпп
                        this.userInfo = res.data.info //список записей заправок

                    }
                    else {
                        this.userCost = res.data.cost
                        this.userCar = res.data.car
                        this.userInfo = res.data.info
                        this.userMaslo = 0
                        this.userSvechi = 0
                        this.userMasloAKPP = 0
                        this.userToplFilter = 0
                        this.userTormozn = 0

                    }
                })
            }, 1000);
        }
    },
    persist: true
}
);




