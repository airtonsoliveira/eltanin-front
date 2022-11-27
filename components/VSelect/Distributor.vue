<script>
import VSelectMixin from '@/mixins/vuetify/select'

export default {
    name: 'VSelectDistributor',

    mixins: [VSelectMixin],

    data: () => {
        return {
            options: []
        }
    },

    computed: {
        _attrsField () {
            const attrs = this.$attrs
            return { ...attrs }
        },

        _propsField () {
            const props = this.$props
            return {
                ...props,

                solo: true,

                label: 'Distribuidora',
                itemText: 'name',
                itemValue: 'id'
            }
        }
    },

    methods: {
        onDoneDistributorGet({ data }) {
            this.options = data?.data ? data.data : []
        }
    }
}
</script>

<template>
<ApiDistributorGet
    ref="apiDistributorGet"
    @done="onDoneDistributorGet"
>
    <v-select
        v-bind="_propsField"
        v-on="$listeners"
        :attrs="_attrsField"
        :items="options"
    />
</ApiDistributorGet>
</template>

