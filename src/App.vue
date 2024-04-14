<script setup lang="ts">
import HelloWorld from '../src/components/HelloWorld.vue'
import CountCard from '../src/components/CountCard.vue';
import Table from '../src/components/Table.vue';

const headtest: string[] = ['Expertize', 'Total de parceiros', 'Tempo médio de conclusão']
const bodytest: any[] = [['dataA1', 'dataA2', 'dataA3'], ['dataB1', 452345345, 'dataB3'], ['dataC1', 'dataC2', 'dataC3'], ['dataD1', 'dataD2', 'dataD3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'],['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3'], ['dataE1', 'dataE2', 'dataE3']]
</script>

<template>
	<div class="container">
		<div class="card">
			<CountCard title="Total de qualificadores" :number="150"></CountCard>
			<CountCard title="Total de expertize" :number="34"></CountCard>
			<CountCard title="Total de parceiros" :number="9.856"></CountCard>
		</div>
	</div>
	<div class="table">
		<Table :head="headtest" :body="bodytest"></Table>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	/* Define a altura do container como 100% da altura da viewport */
}

.card {
	display: flex;
	flex-direction: row;
	gap: 20px;
}

.table {
	align-content: center;
}
</style>
