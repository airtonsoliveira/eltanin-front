import Vue from 'vue'

import AxiosPostMixin from '@/mixins/axios/post.js'

export default Vue.extend({
    name: 'ApiInvoicePost',

    mixins: [AxiosPostMixin],

    created () {
        this.url = 'https://eltanin-api-production.up.railway.app/invoice'
    }
})