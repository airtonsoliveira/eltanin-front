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
                    this.url = `http://localhost:5500/unit/${val}`
                }
            }
        }
    }
})