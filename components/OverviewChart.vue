<script>
import { formatDateExtended, getLastYearMonths } from '@/util/util'
export default {
    name: 'OverviewChart',

    props: {
        injected: {
            type: Number,
            default: 30
        },

        consumed: {
            type: Number,
            default: 20
        },

        horizontal: {
            type: Boolean,
            default: false
        },

        vertical: {
            type: Boolean,
            default: true
        }
    },

    data: () => {
        return {  
            invoices: [],
            yearMonths: [],
            dataGrouped: [
                {
                    name: 'Consumo não Compensado',
                    data: [0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'Energia Compensada',
                    data: [0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'Créditos Gerados',
                    data: [0, 0, 0, 0, 0, 0]
                }
            ]
        }
    },

    computed: {
        _attrsField () {
            const attrs = this.$attrs
            return { ...attrs }
        },

        _propsField () {
            const props = this.$props
            return { ...props }
        },

        options () {
            return {
                chart: {
                    stacked: true,
                    stackType: "100%",
                    type: 'bar',
                    height: 300
                },
                colors: ['#092E1A', '#23844F', '#31D37C'],
                plotOptions: {
                    bar: {
                        horizontal: this.horizontal
                    }
                },
                dataLabels: {
                    enabled: false
                },
                grid: {
                    show: false
                },
                xaxis: {
                    categories: this.yearMonths.map((x) => formatDateExtended(x))
                },
                legend: {
                    show: false
                }
            }
        },

        series () {
            return this.dataGrouped
        }
    },

    methods: {
        getLastYearMonths,

        onDoneInvoiceGet ({ data }) {
            this.invoices = data?.data ? data.data : null,
            this.yearMonths = getLastYearMonths(6)

            this.invoices.forEach((invoice) => {
                const index = this.yearMonths.findIndex((yearMonth) => yearMonth === invoice.referenceMonth)

                invoice.injected += 100
                invoice.consumed += 150

                const exceeded = invoice.injected >= invoice.consumed

                const generated = exceeded ? invoice.injected - invoice.consumed : 0
                const compensated = exceeded ? invoice.consumed : invoice.injected
                const notCompensated = exceeded ? 0 : invoice.consumed - invoice.injected

                this.dataGrouped[2].data[index] += generated
                this.dataGrouped[1].data[index] += compensated
                this.dataGrouped[0].data[index] += notCompensated
            })
        }
    }
}
</script>

<template>
<ApiInvoiceGet @done="onDoneInvoiceGet">
    <AtomsChart
        v-bind="_propsField"
        v-on="$listeners"
        :attrs="_attrsField"
        :options="options"
        :series="series"
    ></AtomsChart>
</ApiInvoiceGet>

</template>
