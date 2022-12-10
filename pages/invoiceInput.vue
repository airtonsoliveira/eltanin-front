<template>
	<div>
		<ApiInvoiceGetById
			manualSubmit
			ref="apiInvoiceGet"
			:id="invoiceId"
			@done="onDoneInvoiceGet"
		/>
		<ApiInvoicePut
			manualSubmit
			ref="apiInvoicePut"
			:id="invoiceId"
			:variables="formData"
			@done="onDoneInvoicePut"
			@error="onErrorInvoicePut"
		/>
		<ApiInvoicePost
			manualSubmit
			ref="apiInvoicePost"
			:variables="formData"
			@done="onDoneInvoicePost"
			@error="onErrorInvoicePost"
		/>
		<ApiInvoiceCapture
			manualSubmit
			ref="apiInvoiceCapture"
			:variables="formData"
			@done="onDoneInvoiceCapture"
			@error="onErrorInvoiceCapture"
		></ApiInvoiceCapture>
		<ApiInvoiceDelete
			ref="apiInvoiceDelete"
			:id="invoiceId"
			@done="onDoneInvoiceDelete"
			@error="onErrorInvoiceDelete"
		/>
		<v-row v-if="invoice" class="mx-n14" style="backgroundColor: #087890">
			<v-col class="pl-14 white--text">
				Edição de fatura
			</v-col>
			<v-col class="mr-10" cols="3">
				<v-btn
					small
					color="#fff"
					@click="$router.push(`/invoice?id=${invoice.id}`)"
				>
					Resumo da fatura
				</v-btn>
				<v-btn
					small
					color="error"
					@click="onClickDelete"
				>
					Deletar
				</v-btn>
			</v-col>
		</v-row>
		<v-row v-else class="mx-n14" style="backgroundColor: #087890">
			<v-col class="pl-14 white--text">
				Adicionar nova fatura
			</v-col>
		</v-row>
		<v-row>
			<v-col class="mt-4">
				<VSelectUnit hide-details v-model="formData.unitId"/>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<VSelectDistributor hide-details v-model="formData.distributorId"/>
			</v-col>
		</v-row>
		<v-row class="pb-4">
			<v-col cols="6">
				<v-select
					hide-details
					solo
					itemText="text"
					itemValue="value"
					label="Mês Referência"
					:items="months"
					v-model="month"
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
					v-model="year"
				>
				</v-select>
			</v-col>
		</v-row>
		<v-switch v-show="!invoiceId"
			v-model="uploadSwitch"
			label="Leitura automática"
		></v-switch>
		<div v-if="uploadSwitch && !invoiceId">
			<v-row>
				<v-col> Anexar PDF da fatura </v-col>
			</v-row>
			<v-divider class="pt-2 pb-6"></v-divider>
			<v-row>
				<v-col class="py-0">
					<v-file-input
						solo
						label="PDF da fatura"
						v-model="file"
						@change="uploadFile"
					/>
				</v-col>
			</v-row>
		</div>
		<div v-if="!uploadSwitch || captured">
			<ApiItemTypeGet
				ref="apiItemTypeGet"
				@done="onDoneItemTypeGet"
			/>
			<v-row>
				<v-col> Itens da Fatura </v-col>
			</v-row>
			<v-divider class="pt-2 pb-6"></v-divider>
			<v-row v-for="(item, index) in items" :key="index">
				<v-col class="py-0" cols="7">
					<v-autocomplete
						hide-details
						solo
						label='Item da fatura'
						itemText='name'
						itemValue='id'
						v-model="formData.items[index].type"
						:items="itemOptions"
					/>
				</v-col>
				<v-col class="py-0" cols="4">
					<v-text-field
						solo
						label="Valor"
						placeholder="Valor"
						v-model="formData.items[index].value"
					></v-text-field>
				</v-col>
				<v-col class="pt-1">
					<v-btn
						icon
						color="error"
						@click="formData.items.splice(index, 1)"
					>
						<v-icon>
							mdi-delete-outline
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="pt-0">
					<v-btn fab small dark color="#087890" @click="insertItem">
						<v-icon dark>
							mdi-plus
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</div>
		<v-row>
			<v-col align="end">
				<v-btn dark color="#034a59" :loading="loading" @click="() => {loading=true; onSubmit()}"> Concluir </v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { formatDateExtended } from '@/util/util';
import Swal from 'sweetalert2'

const initFormData = {
	unitId: null,
	distributorId: null,
	referenceMonth: null,
	items: [
		{
			type: 8,
			value: null
		},
		{
			type: 9,
			value: null
		},
		{
			type: 13,
			value: null
		},
		{
			type: 21,
			value: null
		},
		{
			type: 22,
			value: null
		},
		{
			type: 25,
			value: null
		},
		{
			type: 38,
			value: null
		}
	],
	file: null
}

const initItemList = {
	type: null,
	value: null
}

export default {
	name: 'InvoiceInputPage',

	middleware: 'authenticated',

	data() {
		return {
			file: null,
			invoice: null,
			invoiceId: null,
			uploadSwitch: false,
			captured: false,
			loading: false,
			month: null,
			year: null,
			itemOptions: [],
			formData: Object.assign({}, initFormData),
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
				if (val.params.invoiceId) {
					this.invoiceId = String(val.params.invoiceId);
					this.$nextTick(() => {
						this.$refs.apiInvoiceGet?.submit();
					});
				}
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

		items() {
			return this.formData.items
		}
	},

	methods: {
		formatDateExtended,

		insertItem() {
			const list = Object.assign({}, initItemList)
			this.formData.items.push(list)
		},

		onSubmit() {
			this.formData.referenceMonth = 100*this.year + this.month
			if(this.uploadSwitch){
				this.$refs.apiInvoiceCapture?.submit()
			} else {
				if (Number(this.invoiceId)) {
					this.$nextTick(() => {
						this.$refs.apiInvoicePut?.submit()
					})
				} else {
					this.$nextTick(() => {
						this.$refs.apiInvoicePost?.submit()
					})
				}
			}
		},

		onClickDelete() {
			Swal.fire({
				title: "Deseja deletar a fatura?",
				html: "Após a deleção não será possível visualizar ou acessar a fatura",
				showDenyButton: true,
				confirmButtonText: "Deletar",
				denyButtonText: "Cancelar",
			}).then((result) => {
				if (result.isConfirmed) {
					this.$refs.apiInvoiceDelete?.submit()
				}
			});
		},

		onDoneInvoiceDelete() {
			Swal.fire("Sucesso", "Fatura deletada", "success");
			this.$router.push('/history')
		},

		onErrorInvoiceDelete() {
			Swal.fire("Erro", "Erro ao deletar a fatura", "error");
		},

		onDoneInvoiceGet({ data }) {
			this.invoice = data?.data.length ? data.data[0] : null;

			if (this.invoice) {
				this.formData = {
					...this.formData,
					unitId: this.invoice.unitId,
					distributorId: this.invoice.distributorId,
					referenceMonth: this.invoice.referenceMonth,
					items: this.invoice.items,
					file: this.invoice.file
				};
			}

			this.year = Math.trunc(this.invoice.referenceMonth/100)
			this.month = this.invoice.referenceMonth%100

			this.file = this.invoice.file

		},

		onDoneInvoiceCapture({ data }) {
			if(data?.data.length) {
				const items = data?.data.length ? data.data.filter(item => item.type) : []
				this.formData.items = items.map((item) => {
					return {
						type: item.type,
						value: String(item.value).includes(',') ? this.treatNumber(item.value) : item.value
					}
				})
				this.captured = true
				this.loading = false

				if (Number(this.invoiceId)) {
					this.$nextTick(() => {
						this.$refs.apiInvoicePut?.submit()
					})
				} else {
					this.$nextTick(() => {
						this.$refs.apiInvoicePost?.submit()
					})
				}
			}
		},

		onErrorInvoiceCapture() {
			this.captured = false
			Swal.fire("Erro", "Erro ao capturar fatura", "error");
		},

		onDoneInvoicePost() {
			Swal.fire("Sucesso", "Fatura adicionada", "success");
		},

		onErrorInvoicePost() {
			Swal.fire("Erro", "Erro ao adicionar fatura", "error");
		},

		onDoneInvoicePut() {
			Swal.fire("Sucesso", "Fatura editada", "success");
		},

		onErrorInvoicePut() {
			Swal.fire("Erro", "Erro ao editar fatura", "error");
		},

		onDoneItemTypeGet({ data }) {
            this.itemOptions = data?.data ? data.data : []
        },

		treatNumber(value) {
			let num = value.replace('.', '')
			num = num.replace(',', '.')
			num = Number(num) > 0 ? Number(num) : -Number(num)
			return num
		},

		async uploadFile(data) {
			const readFile = (dataBlob) => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader()
					reader.onloadend = () => resolve(reader.result)
					reader.readAsDataURL(dataBlob)
				})
			}

			const pdfFile = this.file ? await readFile(this.file) : null
			this.formData.file = pdfFile
		},
	},
};
</script>
