<template>
	<div>
		<v-row>
			<v-col class="text-center">
				<v-card outlined class="pa-2" color="#99CEFF" height="510px">
					<v-col>
						<v-row align="center">
							<v-col class="pa-6 title text-left" cols="4">
								<div class="black--text">Visão Geral</div>
							</v-col>
							<v-col cols="8" align="center">
								<v-card color="#C5F1FF" width="150px">
									<v-col class="py-1 black--text subtitle-1">
										Últimos 6 meses
									</v-col>
								</v-card>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="4" align-self="center">
								<v-row align="center">
									<v-col cols="3">
										<v-card
											color="#31D37C"
											height="40px"
										></v-card>
									</v-col>
									<v-col>
										<div class="black--text text-left">
											Créditos Gerados
										</div>
									</v-col>
								</v-row>
								<v-row align="center">
									<v-col cols="3">
										<v-card
											color="#23844F"
											height="40px"
										></v-card>
									</v-col>
									<v-col>
										<div class="black--text text-left">
											Energia Compensada
										</div>
									</v-col>
								</v-row>
								<v-row align="center">
									<v-col cols="3">
										<v-card color="#092E1A" height="40px">
										</v-card>
									</v-col>
									<v-col>
										<div class="black--text text-left">
											Consumo Não Compensado
										</div>
									</v-col>
								</v-row>
							</v-col>
							<v-col cols="8" class="pa-2 pt-12 pr-4">
								<v-row align="center" class="fill-height">
									<v-col>
										<img
											src="/overview_example.png"
											alt="overview_example"
										/>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-col>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="4">
				<v-btn
					block
					color="#1E1E1E"
					class="text-none text-center white--text"
					height="100px"
					to="/invoiceInput"
				>
					<v-icon right large> mdi-receipt-text-plus </v-icon>
					<v-col> Adicionar nova Fatura </v-col>
				</v-btn>
			</v-col>
			<v-spacer class="col-4"></v-spacer>
			<v-col cols="4">
				<v-btn
					block
					color="#3A416A"
					class="text-none text-center white--text"
					height="100px"
					to="/unit"
				>
					<v-icon right large> mdi-home-plus </v-icon>
					<v-col> Cadastrar nova UC/UG </v-col>
				</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: "OverviewPage",
};
</script>
