<template>
  <div class="dashboard-container">
    <div class="top-side">
      <div class="linechart-container-progress">
        <h3> Progresso médio por track</h3>
        <LineChart :chartData="chartDataProgress" />
      </div>
    </div>
    <div class="bottom-side"> 
      <div class="left-side">
        <div class="linechart-container-time">
          <h3> Tempo médio de conclusão</h3>
          <LineChart :chartData="chartDataTime" />
        </div>
        <div class="linechart-container-count">
          <h3>Quantidade por track</h3>
          <LineChart :chartData="chartDataCount" />
        </div>
      </div>
      <div class="right-side"> 
        <div class="table-dashboard"> 
          <Table
            :headers="tableHeadTrack"
            :initialData="tableBodyTrack"
          />
      </div>      
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import LineChart from '../components/charts/LineChart.vue';
import BarChart from '../components/charts/BarChart.vue';
import Table from '../components/Table.vue';
import { getTrackMetrics } from '../service/TrackMetricService';
import { TrackMetricsSchema } from '../schemas/track/TrackMetrics';
import MultiSelect from 'primevue/multiselect';

const tableBodyTrack = ref<TrackTableRow[]>([]);
const tracks = ref<TrackMetricsSchema[]>([]);
const chartDataTime = ref<chartLineType>({ labels: [], datasets: [] });
const chartDataProgress = ref<chartLineType>({ labels: [], datasets: [] });
const chartDataCount = ref<chartLineType>({ labels: [], datasets: [] });

const tableHeadTrack = [
  'Track',
  'Número de parceiros',
  'Abandono',
  'Média de conclusão',
  'Tempo Médio de conclusão'
];

interface chartLineType {
  labels: string[];
  datasets: datasetType[];
}

interface datasetType {
  label: string;
  data: number[];
  borderColor: string;
  borderWidth: number;
  fill: boolean
}

type TrackTableRow = [
  string,
  number,
  number,
  number,
  number
];

const formattedBarChartData = ref({
  labels: [] as string[],
  datasets: [] as { label: string; data: number[]; backgroundColor: string; borderColor: string; borderWidth: number }[],
});

onMounted(async () => {
  try {
    tracks.value = await getTrackMetrics();
    console.log("tracks loaded", tracks.value);

    const mappedData: TrackTableRow[] = tracks.value.map(track => [
      `Track ${track.trackId}`,
      track.partnerCount,
      track.qualifierCount,
      track.qualifierCount,
      track.qualifierCount ?? 0,
    ]);

    tableBodyTrack.value = mappedData;
    updateChartData();
    console.log('chartDataTime', chartDataTime.value);
  } catch (error) {
    console.error('Erro ao carregar dados dos tracks:', error);
  }
});

function updateChartData() {
  chartDataTime.value = {
    labels: tracks.value.map(track => `Track ${track.trackId}`),
    datasets: [
      {
        label: 'Tempo Médio de Conclusão de Expertise',
        data: tracks.value.map(track => track.expertiseCount ?? 0),
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Tempo Médio de Conclusão de Qualificador',
        data: tracks.value.map(track => track.qualifierCount ?? 0),
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
      }
    ],
  };

  chartDataProgress.value = {
    labels: tracks.value.map(track => `Track ${track.trackId}`),
    datasets: [
      {
        label: 'Progresso de Conclusão de Expertise',
        data: tracks.value.map(track => track.expertiseCount ?? 0),
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Progresso de Conclusão de Qualificador',
        data: tracks.value.map(track => track.qualifierCount ?? 0),
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
      }
    ],
  };

  chartDataCount.value = {
    labels: tracks.value.map(track => `Track ${track.trackId}`),
    datasets: [
      {
        label: 'Contagem de Expertise',
        data: tracks.value.map(track => track.expertiseCount ?? 0),
        borderColor: 'green',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Contagem de Qualificador',
        data: tracks.value.map(track => track.qualifierCount ?? 0),
        borderColor: 'orange',
        borderWidth: 2,
        fill: false,
      }
    ],
  };

  formattedBarChartData.value = {
    labels: tracks.value.map(track => `Track ${track.trackId}`),
    datasets: [
      {
        label: 'Número de Parceiros',
        data: tracks.value.map(track => track.partnerCount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  background-color: #ebf2e8;
  gap: 4px;
}

.top-side{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 100%;
  padding: 10px;
}

.bottom-side{
  display: flex;
  flex-direction: row;
  height: 50%;
  width: 100%;
  gap: 10px;
  padding: 10px;
}

.left-side{
  display: flex;
  flex-direction: column;
  height: 60%;
  width: 100%;
  gap: 10px
}

.right-side{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.linechart-container-time, .linechart-container-progress, .linechart-container-count, .bar-chat-dashboard, .table-dashboard {
  flex: 1;
}

.linechart-container-time,
.linechart-container-count,
.linechart-container-progress
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.table-dashboard{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
h3{
  font-size: 0.8rem;
}
</style>