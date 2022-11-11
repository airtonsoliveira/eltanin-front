export default function ({ $axios }) {
    $axios.onRequest((config) => {
        const token = localStorage.getItem('token')
        const idUser = localStorage.getItem('idUser')
        if (token) {
            config.headers.common.token = token
            config.headers.common.idUser = idUser
        }
    })
}