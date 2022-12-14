<template>
	<div>
		<v-row>
			<v-col cols="12" class="pb-0">
				<h2>Introdução</h2>
				<v-divider></v-divider>
			</v-col>
			<v-col>
				<p>
					A energia elétrica gerada pelos próprios consumidores vem
					ganhando cada vez mais relevância no mundo. A chamada
					Geração Distribuída (GD) permite uma redução de custos a
					longo prazo, tem natureza renovável e apresenta um grande
					potencial de crescimento no Brasil devido a abundância de
					recursos naturais e alta incidencia de luz solar no país.
				</p>
				<p>
					As normas de Geração Distribuída preveem que o consumidor
					possa abater de suas tarifas de consumo a quantidade de
					energia gerada, e em caso de excedente receba "créditos de
					energia" com validade de até 60 meses, podendo estes serem
					usados caso haja consumo maior do que a produção dentro de
					tal prazo de validade. Ao consolidar todo o processo de um
					mes em uma fatura é preciso medir a energia consumida e
					injetada na rede, levar em conta a tarifa e valoração
					daquela energia dependendo do horário, calcular créditos
					acumulados e descontá-los devidamente, dividir a conta de
					acordo com o rateio planejado para aquela usina... Por
					vezes, a distribuidora não consegue gerir todos esses dados
					de forma correta e quem sai no prejuízo é o consumidor,
					pagando mais que deveria por erros de cálculo e sem ter
					consciencia disso.
				</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" class="pb-0">
				<h2>Objetivo</h2>
				<v-divider></v-divider>
			</v-col>
			<v-col>
				<p>
					A fim de resolver os problemas no cálculo da compensação de
					energia elétrica, os valores calculados de tarifa, consumo,
					injeção na rede, compensação e saldo podem ser extraídos da
					fatura recebida pelo consumidor e utilizados para alimentar
					um software que cruze estes dados e audite a fatura,
					provendo consistencia no processo e garantindo o benefício
					economico da instalação no contexto de GD.
				</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" class="pb-0">
				<h2>Análise energética</h2>
				<v-divider></v-divider>
			</v-col>
			<v-col cols="5">
				<p>
					Após entrar com os dados da sua fatura no sistema, o usuário
					deve poder visualizar seu histórico de consumo e geração de
					energia, além de verificar se seu benefício econômico está
					sendo respeitado.
				</p>
				<p>
					As faturas adicionadas ficam acessíveis pela tela
					<a href="/history">Histórico de Faturas</a> e ao clicar em
					uma delas é possível ver seus dados gerais e o resultado das
					análises pelas <strong>regras de energia</strong>.
				</p>
			</v-col>
			<v-col>
				<img
					src="/detalhes.png"
					alt="invoice.png"
					class="mb-5"
					width="100%"
				/>
			</v-col>
		</v-row>
		<v-row v-show="true">
			<v-col cols="12" class="pb-0">
				<h2>Regras de energia</h2>
				<v-divider></v-divider>
			</v-col>
			<v-col>
				<ul>
					<li>
						<strong>Energia compensada deveria existir</strong
						><br />
						RN Nº 687 24/11/2015 - Artigo 7º - inciso II
					</li>

					<li>
						<strong
							>Energia compensada com valor maior que energia
							consumida</strong
						><br />RN Nº 687 24/11/2015 - Artigo 2º - inciso III
					</li>

					<li>
						<strong
							>Há consumo ou compensação, mas não há
							tarifa</strong
						><br />
						RN Nº 687 24/11/2015 - Artigo 2º - inciso III
					</li>

					<li>
						<strong
							>Não há cobrança de consumo ou custo de
							disponibilidade</strong
						><br />
						RN Nº 687 24/11/2015 - Artigo 7º - inciso I
					</li>

					<li>
						<strong
							>Há energia compensada, porém consumo é zero</strong
						><br />
						Não há exatamente uma lei que rege este tópico, porém
						trata-se de um erro, uma vez que compensa-se apenas o
						que se consome. A energia injetada na rede refere-se
						como "injetada" ou até rateada.
					</li>

					<li>
						<strong>Não existe fatura do mes anterior</strong
						><br />O sistema de créditos se baseia nos meses
						anteriores. Em caso de nova instalação o sistema
						considerará 0 como os créditos do período anterior.<br />
						Anexo 11 da RN Nº 956, de 7/12/21, Artigo 20, alínea "a"
					</li>

					<li>
						<strong
							>Injeção maior que consumo, porém o saldo de
							créditos não aumentou</strong
						><br />
						RN Nº 687 24/11/2015 - Artigo 7º - incisos IX, X, XII
					</li>

					<li>
						<strong
							>Injeção menor que consumo, porém saldo de créditos
							não diminuiu ou era zero</strong
						><br />
						RN Nº 687 24/11/2015 - Artigo 7º - incisos IX, X, XII
					</li>

					<li>
						<strong>Saldo após compensação incorreto</strong><br />
						RN Nº 687 24/11/2015 - Artigo 7º - inciso III
					</li>

					<li>
						<strong
							>Energia consumida parcialmente compensada</strong
						><br />
						RN Nº 687 24/11/2015 - Artigo 7º - inciso III
					</li>

					<li>
						<strong
							>Energia consumida não compensada, apesar de injeção
							ou créditos</strong
						><br />
						RN Nº 687 24/11/2015 - Artigo 7º - inciso III
					</li>
				</ul>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: "AboutPage",
};
</script>
