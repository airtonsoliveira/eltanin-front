<script>
import VSelectMixin from '@/mixins/vuetify/select'

export default {
    name: 'VSelectUnit',

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
                
                label: 'Unidade',
                itemText: 'name',
                itemValue: 'id'
            }
        }
    },

    methods: {
        onDoneUnitGet({ data }) {
            this.options = data?.data ? data.data : []
        }
    }
}
</script>

<template>
<ApiUnitGet
    ref="apiUnitGet"
    @done="onDoneUnitGet"
>
    <v-select
        v-bind="_propsField"
        v-on="$listeners"
        :attrs="_attrsField"
        :items="options"
    />
</ApiUnitGet>
</template>

