<template>
  <v-app dark>
    <v-navigation-drawer app dark fixed permanent color="#041D4E" :clipped="true" :mini-variant.sync="miniVariant">
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark style="backgroundColor: #034a59" :clipped-left="true" fixed app>
      <v-btn icon @click.stop="miniVariant = miniVariant">
        <v-icon>mdi-{{
        `chevron-${!miniVariant ? "right" : "left"}`
        }}</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-4" v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main style="backgroundColor: #e9faff">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer dark style="backgroundColor: #034a59" :absolute="false" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Bem-vindo",
          to: "/",
        },
        {
          icon: "mdi-home",
          title: "Visão Geral",
          to: "/overview",
        },
        {
          icon: "mdi-clock",
          title: "Histórico",
          to: "/history",
        },
      ],
      miniVariant: false,
      right: true,
      title: "Eltanin Energia",
    };
  },
};
</script>
