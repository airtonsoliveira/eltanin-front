<template>
	<div>
		<v-row class="mx-n14" style="backgroundcolor: #087890">
			<v-col class="pl-14 white--text"> Adicionar nova fatura </v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-select
					hide-details
					solo
					itemText="text"
					itemValue="value"
					label="Unidade"
					:items="optionsUnitType"
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
					:items="optionsUnitType"
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
					:items="optionsUnitType"
				>
				</v-select>
			</v-col>
			<v-col cols="6">
				<v-select
					hide-details
					solo
					itemText="text"
					itemValue="value"
					label="Ano Referência"
					:items="optionsDistributor"
				>
				</v-select>
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
import { formatDateExtended } from "@/util/util";
export default {
	name: "InvoicePage",

	data() {
		return {
			mensagem: "Nada",
			pathMonth: null,
			tab: 0,
			optionsDistributor: [
				{
					text: "Enel",
					value: 1,
				},
				{
					text: "Energisa",
					value: 2,
				},
			],
			optionsUnitType: [
				{
					text: "UC",
					value: 1,
				},
				{
					text: "UG",
					value: 2,
				},
			],
			optionsUF: [
				{
					text: "SP",
					value: 1,
				},
				{
					text: "MG",
					value: 2,
				},
			],
			ucData: [
				{
					name: "Nº instalação",
					value: "940259574",
				},
				{
					name: "Início vigência",
					value: "01/10/2022",
				},
			],
			rules: [
				"Energia compensada deveria existir",
				"Energia compensada maior que consumo",
				"Injeção maior que consumo, porém o saldo de créditos não aumentou.",
				"Energia consumida não compensada, apesar de injeção ou créditos.",
			],
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
