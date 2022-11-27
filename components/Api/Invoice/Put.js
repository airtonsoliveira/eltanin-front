import Vue from 'vue'

import AxiosPutMixin from '@/mixins/axios/put.js'

export default Vue.extend({
    name: 'ApiInvoicePut',

    mixins: [AxiosPutMixin],

    props: {
        id: {
            type: String,
            default: null
        }
    },

    watch: {
        id: {
            immediate: true,
            handler(val) {
                this.url = `http://localhost:5500/invoice/${val}`
            }
        }
    }
})