<template>
  <div class="dashboard-container">
    <div class="top-side">
      <MultiSelect
        v-model="selectedPartners"
        display="chip"
        :options="partnerOptions"
        optionLabel="name"
        placeholder="Select Partners"
        :maxSelectedLabels="3"
        class="w-full md:w-100rem"
      />
    </div>
    <div class="bottom-side">
      <div class="left-side">
        <div class="scketed-side">
          <div class="legend-stacked">
            <h2>Desempenho dos Parceiros por Track</h2>
            <div class="legend-item">
              <div class="labal-total">Total de Expertises</div>
              <div class="labal-associate">Expertises Associadas</div>
              <div class="labal-final">Expertises Finalizadas</div>
            </div>
          </div>
          <div class="stackbar">
            <div
              v-for="track in tracksWithData"
              :key="track.titulo"
              class="stacked-bar-chart-container"
            >
              <StackedBarChart
                :title="track.titulo"
                :itens="track.itens"
                :data="track.data"
                :height="height"
              />
            </div>
          </div>
        </div>
        <div class="progressbar-container">
          <ProgressBar :tracks="tracksData" />
        </div>
      </div>
      <div class="right-side">
        <div class="pie-chart-container">
          <PieChart :chartData="formattedPieChartData" />
        </div>
        <div class="table-dashboard">
          <Table :headers="tableHeadPartner" :initialData="tableBodyTrack" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import MultiSelect from 'primevue/multiselect';
import { PartnerMetricsSchema } from '../schemas/partner/PartnerMetric';
import {
  getPartnerMetrics,
  getPartnerExpertiseQualifiers,
  getPartnerTrackExpertises,
} from '../service/PartnerMetricsService';
import StackedBarChart from '../components/StackedBarChart.vue';
import ProgressBar from '../components/ProgressBar.vue';
import Table from '../components/Table.vue';
import PieChart from '../components/charts/PieChart.vue';
import { PartnerTrackMetricsSchema } from '../schemas/partner/PartnerTrack';
import { ExpertisePartnerMetricsSchema } from '../schemas/partner/PartnerExpertise';

const partners = ref<PartnerMetricsSchema[]>([]);
const selectedPartners = ref<PartnerMetricsSchema[]>([]);
const partnerOptions = ref<PartnerMetricsSchema[]>([]);
const tableBodyTrack = ref<PartnerTableRow[]>([]);
const formattedPieChartData = ref<{ [key: string]: number }>({});
const trackExpertises = ref<PartnerTrackMetricsSchema[]>([]);
const tracksData = ref<{ [key: string]: { [key: string]: number } }>({});

const tableHeadPartner = [
  'Parceiros',
  'Região',
  'Número de Expertises',
  'Nº Expertises concluídas',
  'Número de qualificadores',
  'Nº Qualificadores Concluídos',
];

type PartnerTableRow = [string, string, number, number, number, number];

interface TrackWithData {
  titulo: string;
  itens: string[];
  data: number[][];
}
const tracksWithData = computed<TrackWithData[]>(() => {
  const tracks: TrackWithData[] = [];
  uniqueTracks.value.forEach(track => {
    const partners: string[] = [];
    trackExpertises.value.forEach(partner => {
      partner.tracks.forEach(trackItem => {
        if (trackItem.trackName === track) {
          partners.push(partner.partner);
        }
      });
    });
    const data = getChartData(track);
    tracks.push({ titulo: track, itens: partners, data });
  });
  return tracks;
});

const uniqueTracks = computed(() => {
  const tracks: string[] = [];
  trackExpertises.value.forEach(partner => {
    partner.tracks.forEach(track => {
      if (!tracks.includes(track.trackName)) {
        tracks.push(track.trackName);
      }
    });
  });
  return tracks;
});

const height = computed(() => {
  const heightList: number[][] = [];
  uniqueTracks.value.forEach(() => {
    heightList.push([100]);
  });
  return heightList;
});

const getChartData = (track: string) => {
  const data: number[][] = [];
  trackExpertises.value.forEach(partner => {
    const relevantTrack = partner.tracks.find(
      partnerTrack => partnerTrack.trackName === track,
    );
    if (relevantTrack) {
      data.push([
        relevantTrack.expertisesTrack,
        relevantTrack.progressExpertises,
        relevantTrack.finalizedExpertises,
      ]);
    }
  });
  console.log('dataaa', data);
  return data;
};

const partnerData = computed(() => {
  const data: { [key: string]: string[] } = {};
  uniqueTracks.value.forEach(track => {
    data[track] = selectedPartners.value.map(partner => partner.name);
  });
  return data;
});

onMounted(async () => {
  try {
    partners.value = await getPartnerMetrics();
    console.log('Loaded partners:', partners.value);
    getPartnerOptions();
  } catch (error) {
    console.error('Erro ao carregar dados dos parceiros:', error);
  }
});

const calcularProgressoExpertise = (
  expertiseData: ExpertisePartnerMetricsSchema[],
) => {
  const progressoExpertises: { [key: string]: { [key: string]: number } } = {};

  expertiseData.forEach(expertise => {
    const { expertise: expertiseName, partners } = expertise;

    const totalQualificadores = expertise.qualifiersExpertise;
    const progressoParceiros: { [key: string]: number } = {};

    partners.forEach(partner => {
      const { partnerName, finalizedQualifiers } = partner;
      let percentualConclusao = 0;
      if (totalQualificadores > 0) {
        percentualConclusao = (finalizedQualifiers / totalQualificadores) * 100;
      }
      progressoParceiros[partnerName] = percentualConclusao;
    });

    progressoExpertises[expertiseName] = progressoParceiros;
  });

  return (tracksData.value = progressoExpertises);
};

watch(
  selectedPartners,
  async newVal => {
    console.log('Selected partners:', newVal);
    const mappedData: PartnerTableRow[] = newVal.map(partner => [
      partner.name,
      partner.city,
      partner.tracks,
      partner.completedTracks,
      partner.qualifiers,
      partner.completedQualifiers,
    ]);
    tableBodyTrack.value = mappedData;

    const pieData = calculateCityPercentage(newVal);
    formattedPieChartData.value = pieData;

    console.log('bar', trackExpertises);
    console.log('height', height);

    if (newVal.length > 0) {
      const partnerNames = newVal.map(partner => partner.name);

      try {
        const expertiseQualifiers =
          await getPartnerExpertiseQualifiers(partnerNames);
        console.log('Expertise Qualifiers:', expertiseQualifiers);

        const trackExpertisesData =
          await getPartnerTrackExpertises(partnerNames);
        console.log('Track Expertises:', trackExpertises);

        trackExpertises.value = trackExpertisesData;

        const progressoExpertises =
          calcularProgressoExpertise(expertiseQualifiers);
        console.log('Progresso das Expertises:', progressoExpertises);
        console.log('tracksWithData:', tracksWithData);
      } catch (error) {
        console.error(
          'Erro ao carregar dados de expertise/qualifiers e tracks/expertises:',
          error,
        );
      }
    }
  },
  { deep: true },
);

function getPartnerOptions() {
  partnerOptions.value = partners.value;
  console.log('selected', selectedPartners);
}

function calculateCityPercentage(partners: PartnerMetricsSchema[]) {
  const cityCounts: { [key: string]: number } = {};
  partners.forEach(partner => {
    if (cityCounts[partner.city]) {
      cityCounts[partner.city]++;
    } else {
      cityCounts[partner.city] = 1;
    }
  });

  const totalPartners = partners.length;
  const cityPercentages: { [key: string]: number } = {};
  for (const city in cityCounts) {
    cityPercentages[city] = (cityCounts[city] / totalPartners) * 100;
  }

  return cityPercentages;
}
</script>

<style>
.dashboard-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100vw;
  background-color: #ebf2e8;
  scrollbar-width: thin;
}

.dashboard-container::-webkit-scrollbar {
  width: 8px;
}

.dashboard-container::-webkit-scrollbar-track {
  background: transparent;
}

.dashboard-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 8px;
}

.dashboard-container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.top-side {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 10%;
  width: 100%;
}

.bottom-side {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
  gap: 10px;
  padding: 10px;
}

.left-side {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 10px;
}

.right-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  gap: 10px;
}

.pie-chart-container {
  display: flex;
  flex-direction: column;
  justify-content: top;
  height: 50%;
  width: 100%;
}

.table-dashboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  overflow: auto;
}

.progressbar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  top: 100px;
  overflow-y: auto;
  border-radius: 8px;
  scrollbar-width: thin;
}

.progressbar-container::-webkit-scrollbar {
  width: 8px;
}

.progressbar-container::-webkit-scrollbar-track {
  background: transparent;
}

.progressbar-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 8px;
}

.progressbar-container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.scketed-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 49vw;
  gap: 10px;
  overflow: auto;
  background-color: #fff;
  border-radius: 8px;
}

.stackbar {
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 10px;
  align-items: center;
  height: 100%;
  width: 100%;
}

.legend-stacked {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.legend-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.labal-total {
  background-color: #e0e0e0;
  width: 180px;
  text-align: center;
  align-items: center;
  padding: 8px;
  border-radius: 15px;
}

.labal-associate {
  background-color: #b46bc2;
  width: 180px;
  text-align: center;
  align-items: center;
  padding: 8px;
  border-radius: 15px;
}

.labal-final {
  background-color: #94df49;
  width: 180px;
  text-align: center;
  align-items: center;
  padding: 8px;
  border-radius: 15px;
}
</style>
