export default function ({ $axios, store }) {
    $axios.onRequest((config) => {
        const loggedIn = store.state.loggedIn
        const token = store.state.token
        const idUser = store.state.idUser
        if (loggedIn) {
            config.headers.common.token = token
            config.headers.common.idUser = idUser
        }
    })
}