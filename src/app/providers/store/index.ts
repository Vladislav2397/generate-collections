import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        // ВАЖНО: состояние должно быть функцией,
        // чтобы модуль мог инстанцироваться несколько раз
        state: () => ({}),
        actions: {},
        mutations: {},
    })
}
