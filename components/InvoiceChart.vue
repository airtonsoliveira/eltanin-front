<script>
export default {
    name: 'InvoiceChart',

    props: {
        height: {
            type: [String, Number],
            default: 'auto'
        },

        injected: {
            type: Number,
            default: 0
        },

        consumed: {
            type: Number,
            default: 0
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
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#31D37C', '#23844F', '#092E1A'],
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
                    categories: ['Resumo'],
                    labels: {
                        show: false
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                yaxis: {
                    show: false
                },
                legend: {
                    show: false
                },
                tooltip: {
                    enabled: true,
                    position: 'bottom',
                }
            }
        },

        series () {
            const exceeded = this.injected >= this.consumed
            return [
                {
                    data: [exceeded ? this.injected - this.consumed : 0],
                    name: 'Cr??ditos Gerados'
                },
                {
                    data: [exceeded ? this.consumed : this.injected],
                    name: 'Energia Compensada'
                },
                {
                    data: [exceeded ? 0 : this.consumed - this.injected],
                    name: 'Consumo n??o Compensado'
                }
            ]
        }
    }
}
</script>

<template>
<AtomsChart
    v-bind="_propsField"
    v-on="$listeners"
    :attrs="_attrsField"
    :options="options"
    :series="series"
></AtomsChart>
</template>
