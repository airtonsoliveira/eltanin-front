// NOTA: ESTE ARQUIVO E RESPONAVEL POR TRATAR AS ROTAS DE API ULTILIZADA PELO AXIOS/COMPONENTES DE API

import { slotScope } from '@/util/slot.js'

export default {

    props: {
        variables: {
            type: [Object],
            default: undefined
        }
    },

    data () {
        return {
            data: undefined,
            error: undefined,
            loading: false,
            response: undefined,
            url: undefined
        }
    },

    watch: {
        loading (value) {
            this.$emit('loading', value)
        }
    },

    methods: {
        urlProxy (url) {
            return url
        }
    },

    render (h) {
        const props = {
            data: this.data,
            error: this.error,
            loading: this.loading,
            response: this.response,
            submit: this.submit
        }

        const slotScoped = slotScope(this, 'default', props, this.$slots.default)

        return this.tag ? h(this.tag, slotScoped) : h('div', slotScoped)
    }
}
