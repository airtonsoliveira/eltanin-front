<script>
import VAutocompleteMixin from '@/mixins/vuetify/autocomplete'

export default {
    name: 'VAutocompleteItemType',

    mixins: [VAutocompleteMixin],

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

                label: 'Item da fatura',
                itemText: 'name',
                itemValue: 'id'
            }
        }
    },

    methods: {
        onDoneItemTypeGet({ data }) {
            this.options = data?.data ? data.data : []
        }
    }
}
</script>

<template>
<ApiItemTypeGet
    ref="apiItemTypeGet"
    @done="onDoneItemTypeGet"
>
    <v-autocomplete
        v-bind="_propsField"
        v-on="$listeners"
        :attrs="_attrsField"
        :items="options"
    />
</ApiItemTypeGet>
</template>

