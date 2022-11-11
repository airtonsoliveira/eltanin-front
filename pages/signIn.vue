<template>
	<v-row justify="center" align="center" class="mt-6">
		<v-col>
			<v-card color="#EFEDED">
				<v-row class="py-8">
					<v-col class="headline text-center" cols="12">
						Cadastro
					</v-col>
				</v-row>
				<v-row>
					<ApiUserPost
						ref="apiUserPost"
						:variables="formData"
					></ApiUserPost>
					<v-col cols="6">
						<v-row justify="center">
							<v-col cols="10">
								<v-text-field
									background-color="#fff"
									outlined
									label="Nome Completo"
									v-model="formData.name"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col cols="10">
								<v-text-field
									background-color="#fff"
									outlined
									label="E-mail"
									type="email"
									v-model="formData.email"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col cols="10">
								<v-text-field
									background-color="#fff"
									outlined
									label="Confirmação de e-mail"
									v-model="formData.emailConfirm"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col cols="10">
								<v-text-field
									background-color="#fff"
									outlined
									label="CPF/CNPJ"
									type="text"
									v-model="formData.cpf"
								></v-text-field>
							</v-col>
						</v-row>
					</v-col>
					<v-col cols="6">
						<v-row justify="center">
							<v-col cols="10">
								<v-text-field
									outlined
									background-color="#fff"
									label="Senha"
									v-model="formData.password"
									:append-icon="
										showPassword ? 'mdi-eye' : 'mdi-eye-off'
									"
									:type="showPassword ? 'text' : 'password'"
									@click:append="showPassword = !showPassword"
								>
								</v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col cols="10">
								<v-text-field
									outlined
									background-color="#fff"
									label="Confirmar Senha"
									v-model="formData.passwordConfirm"
									:append-icon="
										showPassword ? 'mdi-eye' : 'mdi-eye-off'
									"
									:type="showPassword ? 'text' : 'password'"
									@click:append="showPassword = !showPassword"
								>
								</v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col class="mt-12 pb-8" cols="5">
								<v-btn
									block
									dark
									class="text-none"
									color="#041D4E"
									height="70px"
									@click="onSubmit"
								>
									Concluir
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>
  
<script>
const initFormData = {
	name: null,
	email: null,
	emailConfirm: null,
	cpf: null,
	cnpj: null,
	password: null,
	passwordConfirm: null,
};

export default {
	name: "signInPage",

	data() {
		return {
			showPassword: false,
			formData: Object.assign({}, initFormData),
		};
	},

	methods: {
		onSubmit() {
			this.$refs.apiUserPost?.submit();
			this.$router.push("/");
		},
	},
};
</script>
  