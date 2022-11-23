<template>
	<div>
		<v-row class="mx-n14" style="backgroundColor: #087890">
			<v-col class="pl-14 white--text"> Adicionar nova fatura </v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-select
					hide-details
					solo
					itemText="name"
					itemValue="value"
					label="Unidade"
					:items="optionsUnit"
				>
				</v-select>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-select
					hide-details
					solo
					itemText="text"
					itemValue="value"
					label="Distribuidora"
					:items="optionsDistributor"
				>
				</v-select>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="6">
				<v-select
					hide-details
					solo
					itemText="text"
					itemValue="value"
					label="Mês Referência"
					:items="months"
				>
				</v-select>
			</v-col>
			<v-col cols="6">
				<v-select
					hide-details
					solo
					itemText="value"
					itemValue="value"
					label="Ano Referência"
					:items="years"
				>
				</v-select>
			</v-col>
		</v-row>
        <v-row>
			<v-col>
				<v-file-input
					solo
					label="PDF da fatura"
				>
				</v-file-input>
			</v-col>
		</v-row>
		<v-row>
			<v-col align="end">
				<v-btn dark color="#034a59"> Concluir </v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { formatDateExtended } from '@/util/util';
export default {
	name: 'InvoicePage',

	middleware: 'authenticated',

	data() {
		return {
			mensagem: 'Nada',
			pathMonth: null,
			tab: 0,
			optionsDistributor: [
				{
					text: 'Enel',
					value: 1,
				},
				{
					text: 'Energisa',
					value: 2,
				},
			],
            optionsUnit: [
				{
					type: 'UC',
					name: 'Pedro X',
				},
				{
					type: 'UG',
					name: 'Consorcio X',
				},
                {
					type: 'UC',
					name: 'Unidade teste',
				},
			],
			optionsUnitType: [
				{
					text: 'UC',
					value: 1,
				},
				{
					text: 'UG',
					value: 2,
				},
			],
			optionsUF: [
				{
					text: 'SP',
					value: 1,
				},
				{
					text: 'MG',
					value: 2,
				},
			],
			ucData: [
				{
					name: 'Nº instalação',
					value: '940259574',
				},
				{
					name: 'Início vigência',
					value: '01/10/2022',
				},
			],
            months: [
                {
                    value: 1,
                    text: 'Janeiro'
                },
                {
                    value: 2,
                    text: 'Fevereiro'
                },
                {
                    value: 3,
                    text: 'Março'
                },
                {
                    value: 4,
                    text: 'Abril'
                },
                {
                    value: 5,
                    text: 'Maio'
                },
                {
                    value: 6,
                    text: 'Junho'
                },
                {
                    value: 7,
                    text: 'Julho'
                },
                {
                    value: 8,
                    text: 'Agosto'
                },
                {
                    value: 9,
                    text: 'Setembro'
                },
                {
                    value: 10,
                    text: 'Outubro'
                },
                {
                    value: 11,
                    text: 'Novembro'
                },
                {
                    value: 12,
                    text: 'Dezembro'
                }
            ],
            years: [
                {
                    value: 2022,
                },
                {
                    value: 2021,
                },
                {
                    value: 2020,
                },
                {
                    value: 2019,
                },
                {
                    value: 2018,
                },
            ]
		};
	},

	watch: {
		$route: {
			immediate: true,
			handler(val) {
				this.pathMonth = val.query.month;
			},
		},
	},

	computed: {
		selectedMonth() {
			let pathMonth = 202203;
			const selectedMonth = this.months.filter((el) => {
				return el.yearMonth === pathMonth;
			});
			return selectedMonth[0];
		},
	},

	methods: {
		formatDateExtended,
	},
};
</script>
