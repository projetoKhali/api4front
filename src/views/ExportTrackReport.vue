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
  <NotifPopup
    v-if="showPopup"
    :title="notif.title"
    :message="notif.message"
    :type="notif.type"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Table from '../components/Table.vue';
import { getTrackMetrics } from '../service/TrackMetricService';
import { TrackMetricsSchema } from '@/schemas/track/TrackMetrics';
import downloadTrackCSV from '../report/track';
import NotifPopup, { PopupProps } from '../components/NotifPopup.vue';

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

const fetchData = async (page: number) => {
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

onMounted(() => fetchData(1));

const showPopup = ref(false);
const notif: PopupProps = {
  title: '',
  message: '',
  type: 1,
  time: 3000,
};

const openNotifPopup = ({ title, message, type }: PopupProps) => {
  notif.title = title;
  notif.message = message;
  notif.type = type;
  showPopup.value = true;
};

watch(showPopup, newValue => {
  if (newValue) {
    setTimeout(() => {
      showPopup.value = false;
    }, notif.time);
  }
});

const exportCSV = () => {
  downloadTrackCSV();
  openNotifPopup({
    title: 'Relatório exportado!',
    type: 1,
  });
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
  background-color: #7ea774;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 80%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-button:hover {
  background-color: #45a049;
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
