import Vue from 'vue'

import AxiosPostMixin from '@/mixins/axios/post.js'

export default Vue.extend({
    name: 'ApiAuthSignCheck',

    mixins: [AxiosPostMixin],

    created() {
        this.url = 'http://localhost:5500/sign/check'
    }
})