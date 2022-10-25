<template>
  <v-row justify="center" align="center" class="mt-6">
    <v-col cols=4>
      <ApiUserGet
        @done="onDoneHello"
      ></ApiUserGet>
      <v-card color="#EAECFF" height="600px">
        <v-row align="center" class="pa-4 fill-height">
          <v-col class="subtitle-1 text-center black--text">
            <p>
              Bem-vindo(a) ao Eltanin, um sistema de auditoria de faturas criado para geração distribuida baseado nas
              regulações normativas da Aneel.
            </p>
            <p>
              Em caso de dúvidas sobre essas normas ou outras indagações favor acessar a página de “Ajuda”.
            </p>
            <p>
              Equipe Eltanin
            </p>
            <img src="/dragao.jpg" width="90px" />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols=8>
      <v-card color="#EFEDED" v-if="!loggedIn">
        <v-row class="py-8">
          <v-col class="headline text-center" cols="12">
            Login
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field background-color="#fff" outlined label="email" v-model="formData.email"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field outlined background-color="#fff" label="senha" v-model="formData.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="pt-0" cols="4">
            <v-btn block class="text-none" color="primary" height="50px" :disabled="disableLogin" @click="authenticate">
              Entrar
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="pb-10" cols="4">
            <v-btn block outlined text class="text-none" color="primary" height="50px" style="background-color: #fff"
              nuxt to="/userRegistration?nada=nada">
              Cadastrar-se
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-card color="#EFEDED" height="600px" v-else>
        <v-row>
          <v-col class="pa-8">
            Nome: Airton de Souza Oliveira
          </v-col>
          <v-col align-self="center" cols="2">
            <v-btn icon dense color="#041D4E" @click="loggedIn = false">
              <v-icon>
                mdi-logout-variant
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col class="pa-8">
            email: ton020500@gmail.com
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col class="pa-8">
            Unidades cadastradas:
          </v-col>
        </v-row>
        <v-row>
          <v-col class="px-8" cols=12 v-for="unit in units" v-bind:key="unit.name">
            <v-card tile>
              <v-card-title>
                {{ unit.type }}: {{ unit.name }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import swal from 'sweetalert2'
export default {
  name: 'IndexPage',

  data() {
    return {
      showPassword: false,
      loggedIn: false,
      formData: {
        email: null,
        password: null
      },
      hello: null,
      units: [
        {
          type: 'UC',
          name: 'Pedro X'
        },
        {
          type: 'UG',
          name: 'Consorcio X'
        }
      ]
    }
  },

  computed: {
    disableLogin() {
      return !(this.formData.email && this.formData.password)
    }
  },

  methods: {
    authenticate() {
      if (this.formData.email === 'ton020500@gmail.com' && this.formData.password === 'exemplo') {
        this.loggedIn = true
      } else {
        new swal('Credenciais incorretas', 'Verificar usuário e senha', 'error')
      }
    },

    onDoneHello(data){
      console.log(data)
      this.hello = data?.data
    }
  }
}
</script>
