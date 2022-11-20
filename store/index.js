
export default {
    state: () => ({
        loggedIn: false,
        token: null,
        idUser: null
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

    modules: {}
}