import Vue from 'vue'

import AxiosGetMixin from '@/mixins/axios/get.js'

export default Vue.extend({
    name: 'ApiCritiqueGetById',
    
    mixins: [AxiosGetMixin],
    
    props: {
        id: {
            type: String,
            default: null
        }
    },

    watch: {
        id: { 
            immediate: false,
            handler(val) {
                this.url = `https://eltanin-api-production.up.railway.app/critique/${val}`
            }
        }
    }
})