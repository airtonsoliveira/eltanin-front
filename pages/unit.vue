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
			:variables="formData"
			:id="unitId"
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
		<v-row v-if="unit" class="mx-n14" style="backgroundColor: #087890">
			<v-col class="pl-14 white--text">
				{{ unit.name }}
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
					v-model=formData.number
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
					label="Unidade Consumidora"
					v-model="formData.apportionment[0].consumerUnit"
					:items="optionsUnit"
				></v-select>
			</v-col>
			<v-col cols="4">
				<v-text-field
					solo
					label="Percentual"
					placeholder="Percentual"
                    v-model="formData.apportionment[0].percentual"
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
import { formatDateExtended } from '@/util/util';
import Swal from 'sweetalert2';

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
	apportionment: [
		{
			consumerUnit: null,
			percentual: null	
		}
	],
}

export default {
	name: 'InvoicePage',

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
            numberRule: v  => {
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
			optionsUnit: [
				{
					text: 'Pedro X',
					value: 1,
				},
				{
					text: 'Consorcio X',
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
			]
		};
	},

	watch: {
		$route: {
			immediate: true,
			handler(val) {
				this.unitId = String(val.params.unitId);
				if (val.params.unitId) {
					this.$nextTick(() => {
						this.$refs.apiUnitGet?.submit()
					})
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
		}
	},

	methods: {
		formatDateExtended,

        onSubmit() {
            if(this.unitId) {
				this.$refs.apiUnitPut?.submit()
			} else {
				this.$refs.apiUnitPost?.submit()
			}
        },

		onDoneUnitGet({ data }) {
			this.unit = data?.data.length ? data.data[0] : null

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
					complement: this.unit.complement
				}
			}
		},

		onDoneUnitPost({ data }) {
            Swal.fire('Sucesso', 'Unidade cadastrada', 'success')
		},

		
		onDoneUnitPut({ data }) {
			Swal.fire('Sucesso', 'Cadastro atualizado', 'success')
		},

		onError({ data }) {	
			Swal.fire('Erro', 'informações inválidas', 'error')
		}
	},
};
</script>
