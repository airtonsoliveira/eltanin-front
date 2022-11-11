<template>
	<div>
		<v-row class="mx-n14" style="backgroundcolor: #087890">
			<v-col class="pl-14 white--text"> UC Pedro </v-col>
		</v-row>
		<v-row>
			<v-col> Dados da Unidade </v-col>
		</v-row>
		<v-divider class="pa-2"></v-divider>
		<v-row>
			<v-col cols="4">
				<v-select
					hide-details
					solo
					itemText="text"
					itemValue="value"
					label="UC/UG"
					:items="optionsUnitType"
				>
				</v-select>
			</v-col>
			<v-col cols="8">
				<v-text-field
					hide-details
					solo
					label="Nome"
					placeholder="Nome"
				></v-text-field>
			</v-col>
			<v-col cols="8">
				<v-text-field
					hide-details
					solo
					label="Número da Instalação"
					placeholder="Número da Instalação"
				></v-text-field>
			</v-col>
			<v-col cols="4">
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
			<v-col> Local da Unidade </v-col>
		</v-row>
		<v-divider class="pa-2"></v-divider>
		<v-row>
			<v-col cols="10">
				<v-text-field
					hide-details
					solo
					label="Endereço"
					placeholder="Endereço"
				></v-text-field>
			</v-col>
			<v-col cols="2">
				<v-select
					hide-details
					solo
					itemText="text"
					itemValue="value"
					label="UF"
					:items="optionsUF"
				>
				</v-select>
			</v-col>
			<v-col cols="4">
				<v-text-field
					hide-details
					solo
					label="CEP"
					placeholder="CEP"
				></v-text-field>
			</v-col>
			<v-col cols="8">
				<v-text-field
					hide-details
					solo
					label="Cidade"
					placeholder="Cidade"
				></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col> Rateio </v-col>
		</v-row>
		<v-divider class="pa-2"></v-divider>
		<v-row>
			<v-col cols="7">
				<v-select
					hide-details
					solo
					itemText="text"
					itemValue="value"
					label="Unidade Geradora"
					:items="optionsUnitType"
				>
				</v-select>
			</v-col>
			<v-col cols="4">
				<v-text-field
					hide-details
					solo
					label="Percentual"
					placeholder="Percentual"
				></v-text-field>
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
