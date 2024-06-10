import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue'
import { useComponents } from './ComponentsHidden';

export const useUser = defineStore('userStore', {
    state: () => ({
        userID: 1, userLogin: "guest", userCost: 0, userInfo: [], userRashod: 0, userProbeg: 0, userRate: 0, userYearProbeg: 0, userCar: " ", userMaslo: "0", userSvechi: "0", userMasloAKPP: "0", userToplFilter: "0", userTormozn: "0", userMasloCh: "0", userSvechiCh: "0", userMasloAKPPCh: "0", userToplFilterCh: "0", userTormoznCh: "0"
    }
    ),
    getters: {
    },
    actions: {
        registration(value) {
            axios.get(`https://martynovd.ru/back-api/users`).then((res) => {
                let lastId = Number(res.data[res.data.length - 1].id) //последний зарегистрированный id

                let logins = [] //массив логинов
                for (let i = 0; i < res.data.length; i++) {
                    logins.push(res.data[i].login)
                }

                if (logins.includes(value[0]) == false) { //если логин не найден в бд допускается регистрация
                    axios.post(`https://martynovd.ru/back-api/users`, { id: lastId + 1, login: value[0], password: value[1] }) //создание пользователя
                    axios.post(`https://martynovd.ru/back-api/data`, { id: lastId + 1, car: "Unnamed Car", cost: "50", maslo: "0", svechi: "0", masloAKPP: "0", toplFilter: "0", tormozn: "0", info: [] }) //создание data
                    this.userID = lastId + 1 //задает id нового пользователя в сторе
                    this.userLogin = value[0] //задается login пользователя в сторе
                    this.updateInfo()
                }
                else {
                    alert("Такой пользователь существует")
                }
            })

        },

        enter(value) {
            axios.get(`https://martynovd.ru/back-api/users`).then((res) => {
                let logins = []
                let passwords = []
                for (let i = 0; i < res.data.length; i++) {
                    logins.push(res.data[i].login) //массив логинов в дб
                    passwords.push(res.data[i].password) //массив паролей в дб
                }
                let search = logins.indexOf(value[0]); //возврат индекса введенного логина в базе данных или -1 если нет
                if (search > 0 && res.data[search].password == value[1]) { //если найден логин и пароль по этому индексу равен введенному value то
                    this.userID = res.data[search].id //задается id пользователя в сторе
                    this.userLogin = res.data[search].login //задается login пользователя в сторе
                    this.updateInfo()
                }
                else {
                    alert("Неверный логин или пароль")
                }
            })
        },

        exit() {
            this.userID = 1 //задается id пользователя в сторе
            this.userLogin = "guest" //задается login пользователя в сторе
            this.updateInfo()
        },

        deleteAccount() {
            axios.delete(`https://martynovd.ru/back-api/users/${this.userID}`) //удаление user
            axios.delete(`https://martynovd.ru/back-api/data/${this.userID}`) //удаление data
            this.userID = 1 //задается id пользователя в сторе
            this.userLogin = "guest" //задается login пользователя в сторе
            this.updateInfo()

        },

        editPassword(value) {
            if (value[0] == value[1]) { //если пароль и повтор пароля совпадают
                axios.patch(`https://martynovd.ru/back-api/users/${this.userID}`, { password: value[0] }) //изменение пароля
                value[0] = ""
                value[1] = ""
                alert("Пароль изменен")
                // useComponents().showLogin = true
            }
            else {
                alert("Пароли не совпадают")
            }
        },


        updateInfo() {
            useComponents().loaderUpdateInfo = true
            setTimeout(() => {

                axios.get(`https://martynovd.ru/back-api/data/${this.userID}`).then((res) => {

                    //расход бензина на 100км
                    if (res.data.info.length > 1) { //если более 1 записи в истории заправок
                        let rashod = 0
                        let count = 0
                        for (let i = 1; i < res.data.info.length; i++) {
                            rashod = rashod + (res.data.info[i][2] / (res.data.info[i][1] - res.data.info[i - 1][1]) * 100)
                            count++
                        }
                        //

                        //расход на бензин в рублях в месяц
                        let inHour
                        let summ = 0 //сумма всех заправок
                        for (let i = 1; i < res.data.info.length; i++) {
                            summ = summ + (res.data.cost * res.data.info[i][2]) //сумма всех заправок
                        }
                        inHour = (summ / ((res.data.info[res.data.info.length - 1][0] - res.data.info[0][0]) / 1000 / 60 / 60)) * 24 * 30
                        //



                        // обслуживание
                        this.userMasloCh = 6000 - (res.data.info[res.data.info.length - 1][1] - res.data.maslo)
                        this.userSvechiCh = 30000 - (res.data.info[res.data.info.length - 1][1] - res.data.svechi)
                        this.userMasloAKPPCh = 30000 - (res.data.info[res.data.info.length - 1][1] - res.data.masloAKPP)
                        this.userToplFilterCh = 30000 - (res.data.info[res.data.info.length - 1][1] - res.data.toplFilter)
                        this.userTormoznCh = 30000 - (res.data.info[res.data.info.length - 1][1] - res.data.tormozn)
                        //



                        this.userRashod = (rashod / count).toFixed(2) //расход на 100км
                        this.userCost = res.data.cost //стоимость литра топлива
                        this.userCar = res.data.car //модель машины
                        this.userMaslo = res.data.maslo
                        this.userSvechi = res.data.svechi
                        this.userTormozn = res.data.tormoznCh
                        this.userToplFilter = res.data.toplFilter
                        this.userMasloAKPP = res.data.masloAKPP
                        this.userProbeg = res.data.info[res.data.info.length - 1][1] //текущий пробег (последнее показание в info)
                        this.userInfo = res.data.info //список записей заправок
                        this.userRate = inHour.toFixed() //расход на топливо в месяц в рублях
                        this.userYearProbeg = (((res.data.info[res.data.info.length - 1][1] - res.data.info[0][1]) / ((res.data.info[res.data.info.length - 1][0] - res.data.info[0][0]) / 1000 / 60 / 60)) * 24 * 365).toFixed()
                    }

                    else {
                        this.userCost = res.data.cost
                        this.userCar = res.data.car
                        this.userRashod = 0
                        this.userInfo = res.data.info
                        this.userMaslo = 0
                        this.userTormozn = 0
                        this.userSvechi = 0
                        this.userMasloAKPP = 0
                        this.userToplFilter = 0
                        this.userMasloCh = 0
                        this.userSvechiCh = 0
                        this.userMasloAKPPCh = 0
                        this.userInfo = res.data.info
                        this.userProbeg = 0
                        this.userRate = 0
                        this.userYearProbeg = 0
                    }

                })
                useComponents().loaderUpdateInfo = false
            }, 2000);

        }
    },

    persist: true
}

);




