import Vue from 'vue'

import AxiosGetMixin from '@/mixins/axios/get.js'

export default Vue.extend({
    name: 'ApiUserGetById',
    
    mixins: [AxiosGetMixin],
    
    props: {
        id: {
            type: String,
            default: null
        }
    },

    created() {
        const idUser = this.$store.state.idUser
        this.url = `https://eltanin-api-production.up.railway.app/user/${idUser}`
    }
})