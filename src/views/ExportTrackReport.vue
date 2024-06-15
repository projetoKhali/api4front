<template>
  <div class="conteiner">
    <div class="table-list-track">
      <div class="button-div">
        <button @click="() => exportCSV()">Exportar Relatório</button>
      </div>
      <h2>Lista de Tracks</h2>
      <Table
        ref="tableComponent"
        :headers="tableHeaders"
        :initialData="fullData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from '../components/Table.vue';
import { getTrackMetrics } from '../service/TrackMetricsService';
import { TrackMetricsSchema } from '../schemas/track/TrackMetrics';
import downloadTrackCSV from '../report/track';

const tableComponent = ref<Table>();
const tableHeaders = [
  'Nome',
  'Quantidade de Expertises',
  'Quantidade de Qualifiers',
  'Quantidade de Partners',
  'Expertises finalizadas no prazo',
  'Qualifiers finalizadas no prazo',
  'Conclusão de expertises',
  'Conclusão de qualifiers',
  'Média de Qualifiers expirados',
  'Média de conclusão de expertise',
  'Média de conclusão de qualifier',
];

const fullData = ref<TrackTableRow[]>([]);
const tracks = ref<TrackMetricsSchema[]>([]);
const itemsPerPage = 10;

type TrackTableRow = [
  string,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

const fetchData = async () => {
  try {
    tracks.value = await getTrackMetrics();
    const formatted: TrackTableRow[] = tracks.value.map(track => [
      track.trackName,
      track.expertiseCount,
      track.qualifierCount,
      track.partnerCount,
      track.expertiseCompletedOnTime ?? 0,
      track.qualifierCompletedOnTime ?? 0,
      track.expertiseCompletedOnPercentage,
      track.qualifierCompletedOnPercentage,
      track.avgExpiredQualifiers,
      track.avgTrackCompletionPercentage,
      track.avgTrackCompletionTime ?? 0,
    ]);
    fullData.value = formatted;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
};

onMounted(() => fetchData());

const exportCSV = () => {
  downloadTrackCSV();
};
</script>

<style scoped>
.conteiner {
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 100%;
  width: 100%;
  padding-top: 10px;
  background-color: #ebf2e8;
}

.table-list-track {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
}

button {
  width: 20%;
  height: 100px;
  background-color: #7ea774; /* cor de fundo */
  color: white; /* cor do texto */
  border: none; /* remove a borda */
  border-radius: 5px; /* arredonda as bordas */
  font-size: 80%; /* tamanho da fonte */
  cursor: pointer; /* cursor ao passar por cima */
  transition: background-color 0.3s; /* transição suave da cor de fundo */
}

.custom-button:hover {
  background-color: #45a049; /* cor de fundo quando hover */
}

.button-div {
  display: flex;
  flex-direction: column;
  align-items: right;
  width: 100%;
  height: 16%;
  padding-bottom: 10px;
  padding-top: 10px;
}

* {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
