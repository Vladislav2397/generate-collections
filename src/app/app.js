import Vue from 'vue'
import App from './App.vue'
import { createStore } from './providers/store'
import { createRouter } from './providers/router'

// экспортируем функцию фабрику для создания экземпляров
// нового приложения, маршрутизатора и хранилища
export function createApp() {
    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        router,
        store,
        // корневой экземпляр просто рендерит компонент App
        render: (h) => h(App),
    })
    return { app, router, store }
}
