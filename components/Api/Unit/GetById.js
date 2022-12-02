import Vue from 'vue'

import AxiosGetMixin from '@/mixins/axios/get.js'

export default Vue.extend({
    name: 'ApiUnitGetById',

    mixins: [AxiosGetMixin],

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
                if(val) {
                    this.url = `https://eltanin-api-production.up.railway.app/unit/${val}`
                }
            }
        }
    }
})