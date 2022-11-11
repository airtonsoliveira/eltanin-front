
import auth from './auth'


export default {
    state: () => ({
        loggedIn: false
    }),

    mutations: {
        logIn(state) {
            state.loggedIn = true
        },

        logOut(state) {
            state.loggedIn = false
        }
    },

    actions: {},

    getters: {},

    modules: {
        auth
    }
}