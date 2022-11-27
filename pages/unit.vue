<template>
	<div>
		<ApiUnitGetById
			manualSubmit
			ref="apiUnitGet"
			:id="unitId"
			@done="onDoneUnitGet"
		/>
		<ApiUnitPut
			manualSubmit
			ref="apiUnitPut"
			:id="unitId"
			:variables="formData"
			@done="onDoneUnitPut"
			@error="onError"
		/>
		<ApiUnitPost
			manualSubmit
			ref="apiUnitPost"
			:variables="formData"
			@done="onDoneUnitPost"
			@error="onError"
		/>
		<v-row class="mx-n14" style="backgroundColor: #087890">
			<v-col v-if="unit" class="pl-14 white--text">
				Dados cadastrados - {{ unit.name }}
			</v-col>
			<v-col v-else class="pl-14 white--text">
				Cadastro de nova unidade
			</v-col>
		</v-row>
		<v-row>
			<v-col> Dados da Unidade </v-col>
		</v-row>
		<v-divider class="pa-2"></v-divider>
		<v-row>
			<v-col cols="8">
				<v-text-field
					hide-details
					solo
					label="Nome"
					placeholder="Nome"
					v-model="formData.name"
				></v-text-field>
			</v-col>
			<v-col cols="4">
				<v-text-field
					hide-details
					solo
					label="Número da Instalação"
					placeholder="Número da Instalação"
					v-model="formData.code"
				></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col> Local da Unidade </v-col>
		</v-row>
		<v-divider class="pa-2"></v-divider>
		<v-row>
			<v-col cols="4">
				<v-text-field
					hide-details
					solo
					label="CEP"
					placeholder="CEP"
					v-model="formData.zipCode"
				></v-text-field>
			</v-col>
			<v-col cols="8">
				<v-spacer></v-spacer>
			</v-col>
			<v-col cols="10">
				<v-text-field
					hide-details
					solo
					label="Logradouro"
					placeholder="Logradouro"
					v-model="formData.street"
				></v-text-field>
			</v-col>
			<v-col cols="2">
				<v-text-field
					hide-details
					solo
					label="Número"
					placeholder="Número"
					v-model="formData.number"
				></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-text-field
					hide-details
					solo
					label="Bairro"
					placeholder="Bairro"
					v-model="formData.neighborhood"
				></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-text-field
					hide-details
					solo
					label="Complemento"
					placeholder="Complemento"
					v-model="formData.complement"
				></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col> Fornece energia para: </v-col>
		</v-row>
		<v-divider class="pt-2 pb-6"></v-divider>
		<v-row v-for="(apportionment, index) in apportionments" :key="index">
			<v-col class="py-0" cols="7">
				<VSelectUnit hide-details v-model="formData.apportionment[index].consumerUnit"/>
			</v-col>
			<v-col class="py-0" cols="4">
				<v-text-field
					solo
					label="Percentual"
					placeholder="Percentual"
					v-model="formData.apportionment[index].percentual"
					:rules="[numberRule]"
				></v-text-field>
			</v-col>
			<v-col class="pt-1">
				<v-btn
					icon
					color="error"
					@click="formData.apportionment.splice(index, 1)"
				>
					<v-icon>
						mdi-delete-outline
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="pt-0">
				<v-btn fab small dark color="#087890" @click="insertApportionment">
					<v-icon dark>
						mdi-plus
					</v-icon>
				</v-btn>
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

const initFormData = {
	name: null,
	code: null,
	distributorId: null,
	zipCode: null,
	uf: null,
	city: null,
	street: null,
	number: null,
	neighborhood: null,
	complement: null,
	apportionment: [],
};

const initApportionment = {
	consumerUnit: null,
	percentual: null,
}

export default {
	name: 'UnitPage',

	middleware: 'authenticated',

	data() {
		return {
			mensagem: 'Nada',
			unit: null,
			unitId: null,
			pathMonth: null,
			tab: 0,
			percentual: 0,
			formData: Object.assign({}, initFormData),
			numberRule: (v) => {
				if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true;
				return 'Percentual de rateio deve estar entre 0 e 100';
			},
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
				}
			],
		};
	},

	watch: {
		$route: {
			immediate: true,
			handler(val) {
				this.unitId = String(val.params.unitId);
				if (val.params.unitId) {
					this.$nextTick(() => {
						this.$refs.apiUnitGet?.submit();
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

		apportionments() {
			return this.formData.apportionment
		}
	},

	methods: {
		formatDateExtended,

		insertApportionment() {
			const apportionment = Object.assign({}, initApportionment)
			this.formData.apportionment.push(apportionment)
		},

		onSubmit() {
			if (Number(this.unitId)) {
				this.$refs.apiUnitPut?.submit();
			} else {
				this.$refs.apiUnitPost?.submit();
			}
		},

		onDoneUnitGet({ data }) {
			this.unit = data?.data.length ? data.data[0] : null;

			if (this.unit) {
				this.formData = {
					...this.formData,
					name: this.unit.name,
					code: this.unit.code,
					zipCode: this.unit.zipCode,
					city: this.unit.city,
					street: this.unit.street,
					number: this.unit.number,
					neighborhood: this.unit.neighborhood,
					complement: this.unit.complement,
					apportionment: this.unit.apportionment
				};
			}
		},

		onDoneUnitPost({ data }) {
			Swal.fire('Sucesso', 'Unidade cadastrada', 'success');
		},

		onDoneUnitPut({ data }) {
			Swal.fire('Sucesso', 'Cadastro atualizado', 'success');
		},

		onError({ data }) {
			Swal.fire('Erro', 'informações inválidas', 'error');
		},
	},
};
</script>
