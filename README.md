# Fuelly

#### SPA(Single Page Application) на Vue 3 для управления задачами, связанными с формированием отчетности.

## Technology stack (Технологический стэк)







<h1 align="center">Fuelly - Auto Organizer</h1>
<p align="center">Глубокая аналитика использования транспортных средств.</p>


<p align="center">
  <a >
Технологический стэк
  </a>
</p>


### ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![Pinia](https://img.shields.io/badge/Pinia-0d121b?style=for-the-badge)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)  ![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Axios](https://img.shields.io/badge/AXIOS-0d121b?style=for-the-badge)



<p align="center">
  <a href="https://www.npmjs.com/package/pinia-plugin-persistedstate">
    <img alt="npm" src="https://img.shields.io/npm/v/pinia-plugin-persistedstate?color=%23c12127&label=version&logo=npm" />
  </a>
  <a href="https://github.com/prazdevs/pinia-plugin-persistedstate/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/prazdevs/pinia-plugin-persistedstate/ci.yml?branch=main&color=2088FF&logo=github%20actions">
  </a>
  <a href="https://app.codecov.io/gh/prazdevs/pinia-plugin-persistedstate">
    <img alt="Coverage" src="https://img.shields.io/codecov/c/github/prazdevs/pinia-plugin-persistedstate?color=%23f01f7a&flag=plugin&logo=codecov">
  </a>
  <a href="https://github.com/prazdevs/pinia-plugin-persistedstate/tree/HEAD/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/prazdevs/pinia-plugin-persistedstate?color=%233da639&logo=open%20source%20initiative" />
  </a>
</p>

<p align="center">
  <a href="https://prazdevs.github.io/pinia-plugin-persistedstate/" alt="pinia-plugin-persistedstate docs" >
    <img src="https://img.shields.io/badge/PINIA--PLUGIN--PERSISTEDSTATE-READ%20THE%20DOCS%20-blueviolet?style=for-the-badge&logo=read-the-docs&logoColor=white" />
  </a>
</p>





## ✨ Features

- Взаимодействие с управляемой базой данных, размещенной на Linux Ubuntu Server
- Использование библиотеки управления состояниями Pinia
- Построение графиков при помощи Chart.js


## 🚀 Возможности

1. Аутентификация:
   - Авторизация и создание аккаунта для новых пользователей
   - Смена пароля
   - Удаление аккаунта

2. Конфигурация:
   - Установка текущей стоимости топлива с перерасчетом всей аналитики
   - Ввод пробегов текущего обслуживания
   - Смена названия автомобиля
   - Перезапрос и обновление данных с сервера

3. Обслуживание:
   - Вывод остаточного километража до текущего обслуживания
   - Прогноз приближенности ремонта в днях с учетом среднего пробега

4. Тайм-лайн:
   - Вывод истории посещений АЗС с датой, пробегом и количеством залитого топлива
   - Редактирование записей
   - Удаление записей

5. График-бар:
   - Отображение среднего дневного пробега
   - Прогнозирование годового пробега
   - Отображение средней дневной стоимости владения автомобилем
   - Прогнозирование месячной стоимости
   - Отображение и перерасчет данных только за последние 10 дней

6. График-лайн:
   - Отображение расхода топлива автомобилем на 100км по дням
   - Подсчет среднего расхода топлива
   - Отображение и перерасчет данных только за последние 10 дней

6. Статистика:
   - Отображение текущего пробега с возможностью обновления из базы данных
   - Вывод диапазона дат учета текущего автомобиля

## 🔧 Configuration

Installing dependencies (Установка зависимостей)

```
npm install
```
Compiles and start the development server (Компилирует и запускает сервер разработки)
```
npm run dev
```

Compiles and minifies for production (Компилирует и минимизирует для продакшена)
```
npm run build
```