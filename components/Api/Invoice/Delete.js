import Vue from 'vue'

import AxiosDeleteMixin from '@/mixins/axios/delete.js'

export default Vue.extend({
    name: 'ApiInvoiceDelete',

    mixins: [AxiosDeleteMixin],

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
                this.url = `https://eltanin-api-production.up.railway.app/invoice/${val}`
            }
        }
    }
})