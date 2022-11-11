export default {
    namespaced: true,

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
    }
}