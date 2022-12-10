import Vue from 'vue'

import AxiosPostMixin from '@/mixins/axios/post.js'

export default Vue.extend({
    name: 'ApiInvoiceCapture',

    mixins: [AxiosPostMixin],

    created () {
        this.url = 'http://localhost:5000/capture'
    }
})