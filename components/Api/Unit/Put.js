import Vue from 'vue'

import AxiosPutMixin from '@/mixins/axios/put.js'

export default Vue.extend({
    name: 'ApiUnitPut',

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
                this.url = `https://eltanin-api-production.up.railway.app/unit/${val}`
            }
        }
    }
})