export default function ({ $axios, store }) {
    $axios.onRequest((config) => {
        const token = store.state.token
        const idUser = store.state.idUser
        if (token) {
            config.headers.common.token = token
            config.headers.common.idUser = idUser
        }
    })
}