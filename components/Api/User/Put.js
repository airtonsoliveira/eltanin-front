import Vue from 'vue'

import AxiosPutMixin from '@/mixins/axios/put.js'

export default Vue.extend({
    name: 'ApiUserPut',

    mixins: [AxiosPutMixin],

    created() {
        this.url = 'https://eltanin-api-production.up.railway.app/user'
    }
})