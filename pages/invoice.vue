<template>
	<div>
		<v-row class="mx-n14" style="backgroundColor: #087890">
			<v-col class="pl-14 white--text">
				Fatura Referente a {{ formatDateExtended(pathMonth) }} - Pedro X
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="4" class="text-center">
				<v-card
					class="pa-2"
					color="#99CEFF"
					height="300px"
					style="border 1px solid black"
				>
					<div
						class="py-2 ma-n2 text-center title"
						style="backgroundColor: #c5f1ff"
					>
						{{ formatDateExtended(pathMonth) }}
					</div>
					<v-col>
						<v-row class="mt-6">
							<v-col cols="6" align-self="center">
								<v-row align="center">
									<v-col class="pr-0 col-2">
										<v-card
											color="#31D37C"
											height="30px"
											width="10px"
										></v-card>
									</v-col>
									<v-col>
										<div
											class="
												black--text
												text-left
												caption
											"
										>
											Créditos Gerados
										</div>
									</v-col>
								</v-row>
								<v-row align="center">
									<v-col class="pr-0 col-2">
										<v-card
											color="#23844F"
											height="30px"
											width="10px"
										></v-card>
									</v-col>
									<v-col>
										<div
											class="
												black--text
												text-left
												caption
											"
										>
											Energia Compensada
										</div>
									</v-col>
								</v-row>
								<v-row align="center">
									<v-col class="pr-0 col-2">
										<v-card
											color="#092E1A"
											height="30px"
											width="10px"
										></v-card>
									</v-col>
									<v-col>
										<div
											class="
												black--text
												text-left
												caption
											"
										>
											Consumo não Compensado
										</div>
									</v-col>
								</v-row>
							</v-col>
							<v-col cols="6" class="pt-6 pr-4">
								<v-row align="center" class="fill-height">
									<v-col>
										<img
											height="150px"
											src="/invoice_example.png"
											alt="invoice_example"
										/>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-col>
				</v-card>
			</v-col>
			<v-col cols="8">
				<v-card class="pa-2" height="300px">
					<v-row
						class="ma-n2 text-center"
						style="backgroundColor: #d9d9d9"
					>
						<v-col cols="6"> Análises com Problema (0/4) </v-col>
						<v-divider vertical></v-divider>
						<v-col cols="6"> Análises sem Problema (4/4) </v-col>
					</v-row>
					<v-row class="mt-2">
						<v-col cols="6">
							<v-row v-for="rule in []" v-bind:key="rule">
								<v-col class="py-1 text-center">
									{{ rule }}
								</v-col>
							</v-row>
						</v-col>
						<v-divider vertical></v-divider>
						<v-col cols="6">
							<v-row v-for="rule in rules" v-bind:key="rule">
								<v-col class="py-2 text-center">
									{{ rule }}
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="8">
				<v-card color="#D8E7F4" height="260px">
					<v-row class="mt-0 px-3">
						<v-col align-self="center" cols="2">
							<v-row
								class="px-1 py-6 text-center"
								:style="`height: 130px; backgroundColor: ${
									tab == 0 ? '#B9B7B7' : '#D9D9D9'
								}; cursor: pointer; border-radius: 3px 0px 0px 0px`"
								@click="tab = 0"
							>
								<v-col align-self="center">
									Dados da fatura
								</v-col>
							</v-row>
							<v-row
								class="px-1 py-6 text-center"
								:style="`height: 130px; backgroundColor: ${
									tab == 1 ? '#B9B7B7' : '#D9D9D9'
								}; cursor: pointer; border-radius: 0px 0px 0px 3px`"
								@click="tab = 1"
							>
								<v-col align-self="center"> Dados da UC </v-col>
							</v-row>
						</v-col>
						<v-col v-if="tab == 0" cols="10">
							<v-row align="center" class="text-center">
								<v-col
									cols="3"
									style="height: 130px"
									v-for="item in invoiceData"
									v-bind:key="item.name"
								>
									<v-row class="pt-4 text-center">
										<v-col class="py-1 subtitle-2">
											{{ item.name }}
										</v-col>
									</v-row>
									<v-row
										class="
											font-weight-black
											text-center
											subtitle-2
										"
									>
										<v-col class="py-1">
											{{ item.value }}
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</v-col>
						<v-col v-if="tab == 1" cols="10">
							<v-row align="center" class="text-center">
								<v-col
									cols="3"
									style="height: 130px"
									v-for="item in ucData"
									v-bind:key="item.name"
								>
									<v-row class="pt-4 text-center">
										<v-col class="py-1 subtitle-2">
											{{ item.name }}
										</v-col>
									</v-row>
									<v-row
										class="
											font-weight-black
											text-center
											subtitle-2
										"
									>
										<v-col class="py-1">
											{{ item.value }}
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-row>
					<v-col class="pb-2" cols="12">
						<v-btn
							block
							dark
							color="#05061D"
							class="text-none text-center title"
							height="120px"
						>
							<v-icon large right>
								mdi-receipt-text-check
							</v-icon>
							<v-col> Analisar </v-col>
						</v-btn>
					</v-col>
					<v-col>
						<v-btn
							block
							dark
							color="#3A416A"
							class="text-none text-center title"
							height="120px"
							to="/unit"
						>
							<v-icon large right> mdi-home-edit </v-icon>
							<v-col> Editar UC </v-col>
						</v-btn>
					</v-col>
				</v-row>
				<v-row class="pb-4"> </v-row>
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
			invoiceData: [
				{
					name: "Distribuidora",
					value: "ENERGISA",
				},
				{
					name: "Vencimento",
					value: "20/09/2022",
				},
				{
					name: "Valor",
					value: "R$363,04",
				},
			],
			months: [
				{
					yearMonth: 202109,
					generated: 20,
					compensated: 120,
					notCompensated: 20,
					exceeded: 1,
				},
				{
					yearMonth: 202110,
					generated: 30,
					compensated: 2,
					notCompensated: 0,
					exceeded: 1,
				},
				{
					yearMonth: 202111,
					generated: 20,
					compensated: 100,
					notCompensated: 20,
					exceeded: 0,
				},
				{
					yearMonth: 202112,
					generated: 50,
					compensated: 100,
					notCompensated: 20,
					exceeded: 1,
				},
				{
					yearMonth: 202201,
					generated: 200,
					compensated: 100,
					notCompensated: 20,
					exceeded: 1,
				},
				{
					yearMonth: 202202,
					generated: 200,
					compensated: 10,
					notCompensated: 20,
					exceeded: 0,
				},
				{
					yearMonth: 202203,
					generated: 20,
					compensated: 100,
					notCompensated: 20,
					exceeded: 0,
				},
				{
					yearMonth: 202204,
					generated: 30,
					compensated: 70,
					notCompensated: 0,
					exceeded: 1,
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
