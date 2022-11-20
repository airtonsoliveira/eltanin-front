
export default {
    state: () => ({
        loggedIn: false,
        token: null,
        idUser: null
    }),

    mutations: {
        logIn(state, payload) {
            state.loggedIn = true
            state.token = payload.token
            state.idUser = payload.idUser
        },

        logOut(state) {
            state.loggedIn = false
            state.token = null
            state.idUser = null
        }
    },

    actions: {},

    getters: {},

    modules: {}
}