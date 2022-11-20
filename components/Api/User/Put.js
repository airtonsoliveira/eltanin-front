import Vue from 'vue'

import AxiosPutMixin from '@/mixins/axios/put.js'

export default Vue.extend({
    name: 'ApiUserPut',

    mixins: [AxiosPutMixin],

    created() {
        this.url = 'http://localhost:5500/user'
    }
})