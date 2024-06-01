import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue'

export const useUser = defineStore('userStore', {
    state: () => ({
        userID: 1, userLogin: "guest", userCost: 0, userInfo: [], userRashod: 0, userProbeg: 0, userRate: 0
    }),
    getters: {
    },
    actions: {
        registration(value) {
            axios.get(`https://martynovd.ru/back-api/users`).then((res) => {
                // console.log(res.data)
                // console.log(value[0])
                let lastId = Number(res.data[res.data.length - 1].id) //последний зарегистрированный id

                let logins = []
                for (let i = 0; i < res.data.length; i++) {
                    logins.push(res.data[i].login)
                }

                if (logins.includes(value[0]) == false) {
                    axios.post(`https://martynovd.ru/back-api/users`, { id: lastId + 1, login: value[0], password: value[1] }) //создание пользователя
                    axios.post(`https://martynovd.ru/back-api/data`, { id: lastId + 1, cost: 50, info: [] }) //создание data
                    this.userID = lastId + 1 //задает id нового пользователя в сторе
                    this.userLogin = value[0] //задается login пользователя в сторе
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
                }
                else {
                    alert("Неверный логин или пароль")
                }
            })
        },

        exit() {
            this.userID = 1 //задается id пользователя в сторе
            this.userLogin = "guest" //задается login пользователя в сторе
        },

        deleteAccount() {
            axios.delete(`https://martynovd.ru/back-api/users/${this.userID}`) //удаление user
            axios.delete(`https://martynovd.ru/back-api/data/${this.userID}`) //удаление data
            this.userID = 1 //задается id пользователя в сторе
            this.userLogin = "guest" //задается login пользователя в сторе
        },

        editPassword(value) {
            if (value[0] == value[1]) {
                axios.patch(`https://martynovd.ru/back-api/users/${this.userID}`, { password: value[0] }) //изменение пароля
                value[0] = ""
                value[1] = ""
                alert("Пароль изменен")
            }
            else {
                alert("Пароли не совпадают")
            }

        },


        updateInfo() {

            setTimeout(() => {
                axios.get(`https://martynovd.ru/back-api/data/${this.userID}`).then((res) => {
                    console.log(res.data)
                    let rashod = 0
                    let count = 0
                    for (let i = 1; i < res.data.info.length; i++) {
                        rashod = rashod + (res.data.info[i][2] / (res.data.info[i][1] - res.data.info[i - 1][1]) * 100)
                        count++
                    }

                    let summ = 0 //сумма всех заправок
                    for (let i = 0; i < res.data.info.length; i++) {
                        summ = summ + (res.data.cost * res.data.info[i][2])
                    }
                    let inHour = summ / ((res.data.info[res.data.info.length - 1][0] - res.data.info[0][0]) / 1000 / 60 / 60)
                    console.log(inHour)


                    this.userRashod = rashod / count
                    this.userCost = res.data.cost
                    this.userProbeg = res.data.info[res.data.info.length - 1][1]
                    this.userInfo = res.data.info
                    this.userRate = inHour * 24 * 30 //расход на бензин в рублях в месяц
                    console.log(this.userRashod)
                })
            }, 2000);


        }
    },

    persist: true
}

);




