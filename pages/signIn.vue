<template>
	<v-row justify="center" align="center" class="mt-6">
		<v-col>
			<v-card color="#EFEDED">
                <v-row class="py-8" v-if="loggedIn">
                    <ApiUserGetById
						:id="idUser"
                        @done="onDoneUserById"
                    ></ApiUserGetById>
					<v-col class="headline text-center" cols="12">
						Edição de Cadastro
					</v-col>
				</v-row>
				<v-row class="py-8" v-else>
					<v-col class="headline text-center" cols="12">
						Cadastro
					</v-col>
				</v-row>
				<v-row>
					<ApiUserPost
						ref="apiUserPost"
						:variables="formData"
                        @done="onDoneUserPost"
					></ApiUserPost>
					<ApiUserPut
						ref="apiUserPut"
						:variables="formData"
                        @done="onDoneUserPost"
					></ApiUserPut>
					<v-col cols="6">
						<v-row justify="center">
							<v-col cols="10">
								<v-text-field
									backgroundColor="#fff"
									outlined
									label="Nome Completo"
									v-model="formData.name"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col cols="10">
								<v-text-field
									backgroundColor="#fff"
									outlined
									label="E-mail"
									type="email"
									v-model="formData.email"
									:disabled="loggedIn"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col cols="10">
								<v-text-field
									backgroundColor="#fff"
									outlined
									label="Confirmação de e-mail"
									v-model="formData.emailConfirm"
									v-if="!loggedIn"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col cols="10">
								<v-text-field
									backgroundColor="#fff"
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
									backgroundColor="#fff"
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
									backgroundColor="#fff"
									label="Confirmar Senha"
									v-model="formData.passwordConfirm"
									v-if="!loggedIn"
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
import swal from 'sweetalert2';

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

    computed: {
        loggedIn() {
			return this.$store.state.loggedIn
        },

		idUser() {
			return String(this.$store.state.idUser)
		}
    },

	methods: {
		onSubmit() {
			if (this.loggedIn) {
				this.$refs.apiUserPut?.submit()
			} else {
				this.$refs.apiUserPost?.submit()
			}
		},

        onDoneUserById({ data }) {
			this.formData = data?.data.length ? data.data[0] : initFormData
        },

        onDoneUserPost() {
            //swal.fire('Error', 'Usuário já está cadastrado', 'error')
            if (this.loggedIn) {
				swal.fire('Sucesso', 'Cadastro atualizado', 'success').then((click) => {
					if (click.isConfirmed) {
						this.$router.push('/')
					}
				})
			} else {
				swal.fire('Sucesso', 'Usuário cadastrado', 'success').then((click) => {
					if (click.isConfirmed) {
						this.$router.push('/')
					}
				})
			}
        }
	},
};
</script>
  