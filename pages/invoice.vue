<template>
	<ApiInvoiceGetById
		ref="apiInvoiceGet"
		:id="invoiceId"
		@done="onDoneInvoiceGet"
	>
		<div v-if="invoice">
			<v-row class="mx-n14" style="backgroundColor: #087890">
				<v-col class="pl-14 white--text">
					Fatura Referente a
					{{ formatDateExtended(invoice.referenceMonth) }}
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
							Resumo energético
						</div>
						<v-col>
							<v-row>
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
								<v-col cols="6" class="pa-0">
									<v-row align="center" class="fill-height">
										<v-col>
											<InvoiceChart
												height="250"
												:consumed="
													invoice.consumed + 150
												"
												:injected="
													invoice.injected + 100
												"
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
							<v-col cols="6">
								Análises com Problema (0/4)
							</v-col>
							<v-divider vertical></v-divider>
							<v-col cols="6">
								Análises sem Problema (4/4)
							</v-col>
						</v-row>
						<v-row class="mt-2">
							<v-col cols="6" style="height: 250px; overflow-y: auto">
								<v-row v-for="rule in []" :key="rule">
									<v-col class="py-1 text-center">
										{{ rule }}
									</v-col>
								</v-row>
							</v-col>
							<v-divider vertical></v-divider>
							<v-col cols="6" style="height: 250px; overflow-y: auto">
								<v-row v-for="rule in rules" :key="rule">
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
					<ApiDistributorGetById
						ref="apiDistributorGet"
						:id="String(invoice.distributorId)"
						@done="onDoneDistributorGet"
					/>
					<ApiUnitGetById
						ref="apiUnitGet"
						:id="String(invoice.unitId)"
						@done="onDoneUnitGet"
					/>
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
									<v-col align-self="center">
										Dados da UC
									</v-col>
								</v-row>
							</v-col>
							<v-col v-if="tab == 0" cols="10">
								<v-row align="center" class="text-center">
									<v-col
										cols="3"
										style="height: 130px"
										v-for="item in invoiceData"
										:key="item.name"
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
										:key="item.name"
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
								color="#555F9B"
								class="text-none text-center title"
								height="72px"
								@click="
									redirect('/invoiceInput', {
										invoiceId: invoice.id,
									})
								"
							>
								<v-icon large right>
									mdi-file-document-edit
								</v-icon>
								<v-col> Editar Fatura </v-col>
							</v-btn>
						</v-col>
						<v-col cols="12">
							<v-btn
								block
								dark
								color="#3A416A"
								class="text-none text-center title"
								height="72px"
								@click="redirect('/unit', { unitId: unit.id })"
							>
								<v-icon large right> mdi-home-edit </v-icon>
								<v-col> Editar Unidade </v-col>
							</v-btn>
						</v-col>
						<v-col cols="12">
							<v-btn
								block
								dark
								color="#05061D"
								class="text-none text-center title"
								height="72px"
								@click="
									redirect('/invoice', {
										invoiceId: invoice.id,
									})
								"
							>
								<v-icon large right>
									mdi-file-document-check
								</v-icon>
								<v-col> Analisar </v-col>
							</v-btn>
						</v-col>
					</v-row>
					<v-row class="pb-4"> </v-row>
				</v-col>
			</v-row>
		</div>
		<div v-else>
			<v-row class="fill-height" align-content="center">
				<v-col> Fatura não encontrada </v-col>
			</v-row>
		</div>
	</ApiInvoiceGetById>
</template>

<script>
import { formatDateExtended } from "@/util/util";
export default {
	name: "InvoicePage",

	middleware: "authenticated",

	data() {
		return {
			invoice: null,
			distributor: null,
			unit: null,
			mensagem: "Nada",
			pathMonth: null,
			tab: 0,
			rules: [
				"Energia compensada deveria existir",
				"Energia compensada maior que consumo",
				"Injeção maior que consumo, porém o saldo de créditos não aumentou.",
				"Energia consumida não compensada, apesar de injeção ou créditos.",
			],
		};
	},

	computed: {
		invoiceId() {
			return this.$route.query.id;
		},

		invoiceData() {
			return [
				{
					name: "Distribuidora",
					value: this.distributor ? this.distributor.name : null,
				},
				{
					name: "Data de Vencimento",
					value: this.invoice
						? this.invoice.dueDate?.slice(0, 10)
						: null,
				},
				{
					name: "Valor",
					value: this.invoice ? "R$ " + this.invoice.value : null,
				},
				{
					name: "Data de Emissão",
					value: this.invoice
						? this.invoice.issueDate?.slice(0, 10)
						: null,
				},
			];
		},

		ucData() {
			return [
				{
					name: "Nº instalação",
					value: this.unit ? this.unit.code : null,
				},
			];
		},
	},

	methods: {
		formatDateExtended,

		redirect(path, params) {
			this.$nextTick(() => {
				this.$router.push({
					name: path.slice(1),
					path: path,
					params: params,
				});
			});
		},

		onDoneInvoiceGet({ data }) {
			this.invoice = data?.data.length ? data.data[0] : null;
		},

		onDoneDistributorGet({ data }) {
			this.distributor = data?.data.length ? data.data[0] : null;
		},

		onDoneUnitGet({ data }) {
			this.unit = data?.data.length ? data.data[0] : null;
		},

		dataMapper(invoice) {
			invoiceData[0].valor = invoice;
		},
	},
};
</script>
