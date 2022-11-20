<template>
	<v-app dark>
		<v-navigation-drawer
			app
			dark
			fixed
			permanent
			color="#041D4E"
			:clipped="true"
			:mini-variant.sync="miniVariant"
		>
			<v-list>
				<v-list-item
					v-for="(page, i) in pagesShowed"
					:key="i"
					:to="page.path"
					router
					exact
				>
					<v-list-item-action>
						<v-icon>{{ page.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="page.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar
			dark
			style="backgroundColor:#034a59"
			:clipped-left="true"
			fixed
			app
		>
			<v-btn icon @click.stop="miniVariant = miniVariant">
				<v-icon
					>mdi-{{
						`chevron-${!miniVariant ? "right" : "left"}`
					}}</v-icon
				>
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
import store from "@/store/index.js";

export default {
	name: "DefaultLayout",
	data() {
		return {
			clipped: false,
			drawer: false,
			fixed: false,
			pagesShowed: [
				{
					icon: "mdi-apps",
					title: "Bem-vindo",
					path: "/",
				},
			],
			pages: [
				{
					icon: "mdi-apps",
					title: "Bem-vindo",
					path: "/",
				},
				{
					icon: "mdi-cube",
					title: "Visão Geral",
					path: "/overview",
				},
				{
					icon: "mdi-clock",
					title: "Histórico",
					path: "/history",
				},
				{
					icon: "mdi-home-plus",
					title: "Nova unidade",
					path: "/unit",
				},
				{
					icon: "mdi-receipt-text-plus",
					title: "Nova fatura",
					path: "/invoiceInput",
				},
			],
			miniVariant: false,
			right: true,
			title: "Eltanin Energia",
		};
	},

	computed: {
		loggedIn() {
			return this.$store.state.loggedIn
		},
	},

	watch: {
		loggedIn: {
			immediate: false,
			handler(value) {
				if (value) {
					this.pagesShowed = this.pages;
				} else {
					this.pagesShowed = [this.pages[0]];
				}
			},
		},
	},
};
</script>
