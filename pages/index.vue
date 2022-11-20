<template>
	<v-row justify="center" align="center" class="mt-6">
		<v-col cols="4">
			<v-card color="#EAECFF" height="600px">
				<v-row align="center" class="pa-4 fill-height">
					<v-col class="subtitle-1 text-center black--text">
						<p>
							Bem-vindo(a) ao Eltanin, um sistema de auditoria de
							faturas criado para geração distribuida baseado nas
							regulações normativas da Aneel.
						</p>
						<p>
							Em caso de dúvidas sobre essas normas ou outras
							indagações favor acessar a página de “Ajuda”.
						</p>
						<p>EQUIPE ELTANIN</p>
            <p>Airton de Souza Oliveira</p>
            <p>André Guarino de Almeida</p>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
		<ApiAuthSign
			ref="apiAuthSign"
			:variables="formData"
			@done="onDoneSign"
			@error="onErrorSign"
		></ApiAuthSign>
		<v-col cols="8">
			<v-card color="#EFEDED" v-if="!loggedIn">
				<v-row class="py-8">
					<v-col class="headline text-center" cols="12">
						Login
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="6">
						<v-text-field
							background-color="#fff"
							outlined
							label="email"
							v-model="formData.user"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="6">
						<v-text-field
							outlined
							background-color="#fff"
							label="senha"
							v-model="formData.pass"
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
					<v-col class="pt-0" cols="4">
						<v-btn
							block
							class="text-none"
							color="primary"
							height="50px"
							:disabled="disableLogin"
							@click="authenticate"
						>
							Entrar
						</v-btn>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col class="pb-10" cols="4">
						<v-btn
							block
							outlined
							text
							class="text-none"
							color="primary"
							height="50px"
							style="background-color: #fff"
							nuxt
							to="/signIn"
						>
							Cadastrar-se
						</v-btn>
					</v-col>
				</v-row>
			</v-card>
			<v-card color="#EFEDED" height="600px" v-else>
				<v-row>
					<v-col class="pa-8">
						Nome: {{ user ? user.name : "Airton de Souza Oliveira" }}
					</v-col>
          <v-col align-self="center" cols="1">
						<v-btn icon dense color="#041D4E" @click="logout">
							<v-icon> mdi-account-edit-outline </v-icon>
						</v-btn>
					</v-col>
					<v-col align-self="center" cols="1">
						<v-btn icon dense color="#041D4E" @click="logout">
							<v-icon> mdi-logout-variant </v-icon>
						</v-btn>
					</v-col>
					<v-col align-self="center" class="mr-4" cols="1">
						<v-btn icon dense color="#041D4E" @click="onSubmitDeleteUser">
							<v-icon> mdi-delete-outline </v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col class="pa-8">
						email: {{ user ? user.email : "ton020500@gmail.com" }}
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col class="pa-8"> Unidades cadastradas: </v-col>
				</v-row>
				<v-row>
					<v-col
						class="px-8"
						cols="12"
						v-for="unit in units"
						v-bind:key="unit.name"
					>
						<v-card tile>
							<v-card-title>
								{{ unit.name }}
							</v-card-title>
						</v-card>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import swal from "sweetalert2"

export default {
	name: "IndexPage",

	layout: "default",

	data() {
		return {
			showPassword: false,
			formData: {
				user: null,
				pass: null,
			},
			idUser: null,
			user: null,
			units: [
				{
					type: "UC",
					name: "Pedro X",
				},
				{
					type: "UG",
					name: "Consorcio X",
				},
        {
					type: "UC",
					name: "Unidade teste",
				},
			],
		}
	},

	computed: {
		disableLogin() {
			return !(this.formData.user && this.formData.pass)
		},
    loggedIn() {
      return this.$store.state.loggedIn
    }
	},

	methods: {
		authenticate() {
			this.$nextTick(() => {
				this.$refs.apiAuthSign?.submit()
			})
		},

		logout() {
      this.$store.commit('logOut')
			localStorage.removeItem("idUser")
			localStorage.removeItem("token")
		},

		onDoneSign({ data }) {
			if (data) {
				localStorage.setItem("idUser", data.data.idUser)
				localStorage.setItem("token", data.data.token)   
        this.$store.commit('logIn')
			}
		},

		onErrorSign(data) {
			swal.fire("Erro de autenticação", data.message, "error")
		},

    onSubmitDeleteUser() {
      swal.fire({
        title: 'Deseja deletar o usuário?',
        html: 'Após a deleção não será possível acessar a plataforma e seu histórico de ações será perdido',
        showDenyButton: true,
        confirmButtonText: 'Deletar',
        denyButtonText: 'Cancelar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          swal.fire('Usuário deletado', '', 'success')
          this.$nextTick(() => {
            this.logout()
          })
        }
      })
    }
	},
}
</script>
