<template>
	<v-row justify="center" align="center" class="mt-6">
		<v-col cols="4">
			<v-card color="#EAECFF" style="height: 600px; overflow-y: auto; overflow-x: hidden">
				<v-row align="center" class="pa-4 fill-height">
					<v-col class="subtitle-1 text-center black--text">
						<p>
							Bem-vindo(a) ao Eltanin, um sistema de auditoria de
							faturas criado para geração distribuida baseado nas
							regulações normativas da Aneel.
						</p>
						<p>
							Em caso de dúvidas sobre essas normas ou outras
							indagações favor acessar a página <a href="/about">Sobre</a>
						</p>
						<img src="/dragon.png" width="40%"/>
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
							backgroundColor="#fff"
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
							backgroundColor="#fff"
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
							style="backgroundColor: #fff"
							nuxt
							to="/signIn"
						>
							Cadastrar-se
						</v-btn>
					</v-col>
				</v-row>
			</v-card>
			<v-card color="#EFEDED" height="600px" v-else>
				<ApiUserGetById
					manualSubmit
					ref="apiUserGet"
					:id="idUser"
					@done="onDoneUserGet"
				></ApiUserGetById>
				<ApiUnitGet
					manualSubmit
					ref="apiUnitGet"
					@done="onDoneUnitGet"
				></ApiUnitGet>
				<v-row>
					<v-col class="pa-8">
						Nome: {{ user ? user.name : null }}
					</v-col>
					<v-col align-self="center" cols="1">
						<v-btn
							icon
							dense
							color="#041D4E"
							@click="$router.push('/signIn')"
						>
							<v-icon> mdi-account-edit-outline </v-icon>
						</v-btn>
					</v-col>
					<v-col align-self="center" class="mr-10" cols="1">
						<v-btn icon dense color="#041D4E" @click="logout">
							<v-icon> mdi-logout-variant </v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col class="pa-8">
						email: {{ user ? user.email : null }}
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col class="pa-8"> Unidades cadastradas: </v-col>
				</v-row>
				<v-row v-if="units.length" class="mr-4" style="height: 360px; overflow-y: auto">
					<v-col
						class="px-8"
						cols="12"
						v-for="unit in units"
						:key="unit.name"
					>
						<v-card
							tile
							@click="redirect('/unit', { unitId: unit.id })"
						>
							<v-card-title>
								{{ unit.name }}
							</v-card-title>
						</v-card>
					</v-col>
				</v-row>
				<v-row v-else>
					<v-col class="px-8" cols="12">
						<v-card tile>
							<v-card-title>
								Nenhuma unidade encontrada...
							</v-card-title>
						</v-card>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import swal from "sweetalert2";

export default {
	name: "IndexPage",

	data() {
		return {
			showPassword: false,
			formData: {
				user: null,
				pass: null,
			},
			user: null,
			units: [],
		};
	},

	computed: {
		disableLogin() {
			return !(this.formData.user && this.formData.pass);
		},

		loggedIn() {
			return this.$store.state.loggedIn;
		},

		idUser() {
			return String(this.$store.state.idUser);
		},
	},

	watch: {
		loggedIn: {
			immediate: true,
			handler(val) {
				if (val) {
					this.$nextTick(() => {
						this.$refs.apiUserGet?.submit();
						this.$refs.apiUnitGet?.submit();
					});
				}
			},
		},
	},

	methods: {
		authenticate() {
			this.$nextTick(() => {
				this.$refs.apiAuthSign?.submit();
			});
		},

		logout() {
			this.$store.commit("logOut");
		},

		redirect(path, params) {
			this.$nextTick(() => {
				this.$router.push({
					name: path.slice(1),
					path: path,
					params: params,
				});
			});
		},

		onDoneSign({ data }) {
			if (data) {
				const token = data.data.token;
				const idUser = data.data.idUser;
				this.$store.commit("logIn", { token, idUser });

				this.$router.push('/overview')

				this.user = {
					name: data.data.name,
					email: this.formData.user,
				};

				this.$nextTick(() => {
					this.$refs.apiUnitGet?.submit();
				});
			}
		},

		onDoneUnitGet({ data }) {
			this.units = data?.data ? data.data : null;
		},

		onDoneUserGet({ data }) {
			this.user = data?.data.length ? data.data[0] : null;
		},

		onErrorSign(data) {
			swal.fire("Erro de autenticação", data.message, "error");
		},

		onSubmitDeleteUser() {
			swal.fire({
				title: "Deseja deletar o usuário?",
				html: "Após a deleção não será possível acessar a plataforma e seu histórico de ações será perdido",
				showDenyButton: true,
				confirmButtonText: "Deletar",
				denyButtonText: "Cancelar",
			}).then((result) => {
				if (result.isConfirmed) {
					swal.fire("Usuário deletado", "", "success");
					this.$nextTick(() => {
						this.logout();
					});
				}
			});
		},
	},
};
</script>
