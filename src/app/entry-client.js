import { createApp } from './app'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    // Инициализируем состояние хранилища данными, внедрёнными на сервере
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    // подразумеваем что шаблон в App.vue имеет корневой элемент с id="app"
    app.$mount('#app')
})
