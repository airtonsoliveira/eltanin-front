<template>
	<div>
		<v-row class="mx-n14" style="background-color: #087890">
			<v-col class="pl-14 white--text"> Histórico de Faturas </v-col>
		</v-row>
		<v-row align="center" class="pb-2">
			<v-col cols="3">
				<v-row align="center">
					<v-col cols="3">
						<v-card color="#31D37C" height="40px"></v-card>
					</v-col>
					<div class="caption text-left">Créditos Gerados</div>
				</v-row>
			</v-col>
			<v-col cols="3">
				<v-row align="center">
					<v-col cols="3">
						<v-card color="#23844F" height="40px"></v-card>
					</v-col>
					<div class="caption text-left">Energia Compensada</div>
				</v-row>
			</v-col>
			<v-col cols="3">
				<v-row align="center">
					<v-col cols="3">
						<v-card color="#092E1A" height="40px"></v-card>
					</v-col>
					<div class="caption text-left">Consumo não Compensado</div>
				</v-row>
			</v-col>
		</v-row>
		<ApiUnitGet @done="onDoneUnitGet"></ApiUnitGet>
		<ApiInvoiceGet @done="onDoneInvoiceGet"></ApiInvoiceGet>
		<v-row v-for="unit in units" :key="unit.id">
			<v-col>
				<v-row>
					<v-col>
						{{ unit.name }}
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col
						v-for="invoice in invoices.filter((el) => {
							return el.unitId === unit.id;
						})"
						:key="invoice.id"
						class="px-5 pb-0"
						cols="4"
						style="height: 220px"
					>
						<v-row
							class="mt-2"
							style="cursor: pointer"
							@click="
								$router.push(
									`/invoice?month=${invoice.referenceMonth}`
								)
							"
						>
							<v-col class="py-0 my-n10">
								<InvoiceChart
									horizontal
									:consumed="invoice.consumed"
									:injected="invoice.injected"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col class="pb-0 text-center">
								{{ formatDateExtended(invoice.referenceMonth) }}
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row>
			<v-spacer style="height: 100px;"/>
		</v-row>
	</div>
</template>

<script>
import { formatDateExtended } from "@/util/util";
export default {
	name: "HistoryPage",

	data() {
		return {
			invoices: [
				{
					id: 1,
					referenceMonth: 202208,
					exceeded: 0,
					unitId: 1,
				},
				{
					id: 2,
					referenceMonth: 202209,
					exceeded: 0,
					unitId: 1,
				},
				{
					id: 3,
					referenceMonth: 202210,
					exceeded: 0,
					unitId: 2,
				},
			],
			units: [],
			months: [
				{
					yearMonth: 202208,
					generated: 4242 - 3741,
					compensated: 3741,
					notCompensated: 0,
					exceeded: 1,
				},
				{
					yearMonth: 202209,
					generated: 5314 - 3433,
					compensated: 3433,
					notCompensated: 0,
					exceeded: 1,
				},
				{
					yearMonth: 202210,
					generated: 5168 - 3792,
					compensated: 3792,
					notCompensated: 0,
					exceeded: 1,
				},
			],
		};
	},

	methods: {
		barPercentual(invoice) {
			let percentual = 0;

			if (invoice.injected && invoice.consumed) {
				const balance = invoice.exceeded
					? invoice.injected - invoice.consumed
					: invoice.consumed - invoice.injected;
				percentual = invoice.exceeded
					? (14 * balance) / invoice.injected
					: 14 * (1 - balance / invoice.consumed);
			}

			return percentual + "%";
		},

		formatDateExtended,

		onDoneInvoiceGet({ data }) {
			this.invoices = data?.data ? data.data : [];
			this.invoices = this.invoices.map((invoice) => {
				return {
					...invoice,
					exceeded:
						invoice.injected && invoice.consumed
							? invoice.injected >= invoice.consumed
							: 0,
				};
			});
		},

		onDoneUnitGet({ data }) {
			this.units = data?.data ? data.data : null;
		},
	},
};
</script>
