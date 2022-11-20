<template>
	<div>
		<v-row class="mx-n14" style="backgroundColor: #087890">
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
					:items="optionsUnit"
				>
				</v-select>
			</v-col>
			<v-col cols="4">
				<v-text-field
					solo
					label="Percentual"
					placeholder="Percentual"
                    v-model="percentual"
                    :rules="[numberRule]"
				></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col align="end">
				<v-btn dark color="#034a59" @click="onSubmit"> Concluir </v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { formatDateExtended } from "@/util/util";
import Swal from "sweetalert2";
export default {
	name: "InvoicePage",

	data() {
		return {
			mensagem: "Nada",
			pathMonth: null,
			tab: 0,
            percentual: 0,
            numberRule: v  => {
                if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
                return 'Percentual de rateio deve estar entre 0 e 100';
            },
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
			optionsUnit: [
				{
					text: "Pedro X",
					value: 1,
				},
				{
					text: "Consorcio X",
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

        onSubmit() {
            //Swal.fire('Erro', 'informações inválidas', 'error')
            Swal.fire('Sucesso', 'Unidade cadastrada', 'success')
            this.$router.push('/')
        }
	},
};
</script>
