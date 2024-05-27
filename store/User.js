import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue'

export const useUser = defineStore('userStore', {
    state: () => ({ user: 1 }),
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
                    this.user = lastId + 1 //задает id нового пользователя в сторе
                }
                else {
                    alert("Такой пользователь существует")
                }
            })

        }
    },
    persist: true
});




// {
//     "users": [
//       {
//         "id": "1",
//         "login": "guest",
//         "password": "guest"
//       }
//     ]
//   }