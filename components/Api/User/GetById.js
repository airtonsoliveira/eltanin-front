import Vue from 'vue'

import AxiosGetMixin from '@/mixins/axios/get.js'

export default Vue.extend({
    name: 'ApiUserGetById',
    

    mixins: [AxiosGetMixin],

    created () {
        this.url = 'http://localhost:5500/user/:id'
    }
})