<template>
	<div>
		<v-row class="mx-n14" style="backgroundColor: #087890">
			<v-col class="pl-14 white--text"> Histórico de Faturas </v-col>
		</v-row>
		<v-row align="center">
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
		<ApiUnitGet
			@done="onDoneUnitGet"
		></ApiUnitGet>
		<ApiInvoiceGet
			@done="onDoneInvoiceGet"
		></ApiInvoiceGet>
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
						v-for="invoice in invoices"
						:key="invoice.id"
						class="px-5"
						cols="2"
						style="height: 170px"
					>
						<v-row
							class="mt-2"
							style="cursor: pointer"
							@click="$router.push(`/invoice?month=${invoice.yearMonth}`)"
						>
							<v-col style="height: 100px"></v-col>
							<v-col
								:style="`height: 100px; width: 14%; background-color: #092E1A; position: absolute; border-radius: 10px 10px 10px 10px;`"
								v-if="!invoice.exceeded"
							></v-col>
							<v-col
								:style="`height: 100px; width: ${ invoice.exceeded ? '14%' : barPercentual(invoice) };
								background-color: #23844F; position: absolute; 
								border-radius: 10px ${invoice.exceeded ? '10px 10px' : '0px 0px'} 10px`"
							></v-col>
							<v-col
								:style="`height: 100px; width: ${barPercentual(invoice)};
								background-color: #31D37C; position: absolute; border-radius: 10px 0px 0px 10px;`"
								v-if="invoice.exceeded"
							></v-col>
						</v-row>
						<v-row>
							<v-col class="pb-0 text-center">
								{{ formatDateExtended(invoice.yearMonth) }}
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
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
					id: 5,
					yearMonth: 202208,
					generated: 4242 - 3741,
					compensated: 3741,
					notCompensated: 0,
					exceeded: 1,
					unitId: 1
				},
				{
					id: 6,
					yearMonth: 202209,
					generated: 5314 - 3433,
					compensated: 3433,
					notCompensated: 0,
					exceeded: 1,
					unitId: 1
				},
				{
					id: 7,
					yearMonth: 202210,
					generated: 5168 - 3792,
					compensated: 3792,
					notCompensated: 0,
					exceeded: 1,
					unitId: 2
				}
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
		barPercentual(month) {
			const percentual = month.exceeded
				? (14 * month.generated) / (month.compensated + month.generated)
				: 14 *(1 - month.notCompensated/(month.compensated + month.notCompensated));
			return percentual + "%";
		},

		formatDateExtended,

		onDoneInvoiceGet({ data }) {
			console.log(data)
			//this.invoices = data?.data ? data.data : null
		},

		onDoneUnitGet({ data }) {
			this.units = data?.data ? data.data : null
		}
	},
};
</script>
