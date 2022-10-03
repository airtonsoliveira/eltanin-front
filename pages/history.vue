<template>
    <div>
        <v-row class="mx-n14" style="backgroundColor: #087890">
            <v-col class="pl-14 white--text">
                Histórico de Faturas  
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col cols=3>
                <v-row align="center">
                    <v-col cols=3> 
                        <v-card
                            color="#31D37C"
                            height="40px"
                        ></v-card>
                    </v-col>
                    <div class="caption text-left">
                        Créditos Gerados
                    </div>
                </v-row>
            </v-col>
            <v-col cols=3>
                <v-row align="center">
                    <v-col cols=3> 
                        <v-card
                            color="#23844F"
                            height="40px"
                        ></v-card>
                    </v-col>
                    <div class="caption text-left">
                        Energia Compensada
                    </div>
                </v-row>
            </v-col>
            <v-col cols=3>
                <v-row align="center">
                    <v-col cols=3> 
                        <v-card
                            color="#092E1A"
                            height="40px"
                        ></v-card>
                    </v-col>
                    <div class="caption text-left">
                        Consumo não Compensado
                    </div>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                UC1
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col v-for="mes in months" v-bind:key="mes.yearMonth" class="px-5" cols=2 style="height: 170px;">
                <v-row class="mt-2" style="cursor: pointer;" @click="$router.push(`/invoice?month=${mes.yearMonth}`)">
                    <v-col style="height: 100px"></v-col>
                    <v-col
                        :style="`height: 100px; width: 14%; background-color: #092E1A; position: absolute; border-radius: 10px 10px 10px 10px;`"
                        v-if="!mes.exceeded"
                    ></v-col>
                    <v-col :style="`height: 100px; width: ${mes.exceeded ? '14%' : barPercentual(mes)}; background-color: #23844F; position: absolute; 
                                    border-radius: 10px ${mes.exceeded ? '10px 10px' : '0px 0px'} 10px`"
                    ></v-col>
                    <v-col
                        :style="`height: 100px; width: ${barPercentual(mes)}; background-color: #31D37C; position: absolute; border-radius: 10px 0px 0px 10px;`"
                        v-if="mes.exceeded"
                    ></v-col>
                </v-row>
                <v-row>
                    <v-col class="pb-0 text-center">
                        {{ formatDateExtended(mes.yearMonth) }}
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { formatDateExtended } from '@/util/util'
export default {
    name: 'HistoryPage',

    data () {
        return {
            months: [
                {
                   yearMonth: 202109,
                   generated: 20,
                   compensated: 120,
                   notCompensated: 20,
                   exceeded: 1
                },
                {
                   yearMonth: 202110,
                   generated: 30,
                   compensated: 2,
                   notCompensated: 0,
                   exceeded: 1
                },
                {
                   yearMonth: 202111,
                   generated: 20,
                   compensated: 100,
                   notCompensated: 20,
                   exceeded: 0
                },
                {
                   yearMonth: 202112,
                   generated: 50,
                   compensated: 100,
                   notCompensated: 20,
                   exceeded: 1
                },
                {
                   yearMonth: 202201,
                   generated: 200,
                   compensated: 100,
                   notCompensated: 20,
                   exceeded: 1
                },
                {
                   yearMonth: 202202,
                   generated: 200,
                   compensated: 10,
                   notCompensated: 20,
                   exceeded: 0
                },
                {
                   yearMonth: 202203,
                   generated: 20,
                   compensated: 100,
                   notCompensated: 20,
                   exceeded: 0
                },
                {
                   yearMonth: 202204,
                   generated: 30,
                   compensated: 70,
                   notCompensated: 0,
                   exceeded: 1
                },
            ]
        }
    },

    methods: {
        barPercentual (month) {
            const percentual = month.exceeded ? 14*month.generated/(month.compensated + month.generated) : 14*(1 - month.notCompensated/(month.compensated + month.notCompensated))
            return percentual + '%'
        },

        formatDateExtended
    }
};
</script>
