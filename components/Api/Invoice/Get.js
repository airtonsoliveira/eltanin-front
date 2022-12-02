import Vue from 'vue'

import AxiosGetMixin from '@/mixins/axios/get.js'

export default Vue.extend({
    name: 'ApiInvoiceGet',

    mixins: [AxiosGetMixin],

    created () {
        this.url = 'https://eltanin-api-production.up.railway.app/invoice'
    }
})