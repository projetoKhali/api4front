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
        class="w-full md:w-20rem"
      />
    </div>
    <div class="bottom-side">
      <div class="left-side">
        <div class="stacked-bar-chart-container">
          <StackedBarChart :title="title" :itens="itens" :data="data" :height="height" />
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
          <Table
            :headers="tableHeadPartner"
            :initialData="tableBodyTrack"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import MultiSelect from 'primevue/multiselect';
import { PartnerMetricSchema } from '../schemas/partner/PartnerMetric';
import { getPartnerMetrics } from '../service/PartnerMetricService';
import StackedBarChart from '../components/StackedBarChart.vue';
import ProgressBar from '../components/ProgressBar.vue';
import Table from '../components/Table.vue';
import PieChart from '../components/charts/PieChart.vue';

const partners = ref<PartnerMetricSchema[]>([]);
const selectedPartners = ref<PartnerMetricSchema[]>([]);
const partnerOptions = ref<PartnerMetricSchema[]>([]);
const tableBodyTrack = ref<PartnerTableRow[]>([]);
const formattedPieChartData = ref<{ [key: string]: number }>({});

const tableHeadPartner = [
  'Parceiros',
  'Região',
  'Número de Expertises',
  '% Conclusão Expertise',
  'Número de qualificadores',
  '% Conclusão de Qualificadores'
];

type PartnerTableRow = [
  string,
  string,
  number,
  number,
  number,
  number
];

onMounted(async () => {
  try {
    partners.value = await getPartnerMetrics();
    console.log('Loaded partners:', partners.value);
    getPartnerOptions();
  } catch (error) {
    console.error('Erro ao carregar dados dos parceiros:', error);
  }
});

watch(selectedPartners, (newVal) => {
  console.log('Selected partners:', newVal);
  const mappedData: PartnerTableRow[] = newVal.map(partner => [
    partner.name,
    partner.city,
    partner.tracks,
    partner.completedTracks,
    partner.qualifiers,
    partner.completedQualifiers
  ]);
  tableBodyTrack.value = mappedData;

  const pieData = calculateCityPercentage(newVal);
  formattedPieChartData.value = pieData;
}, { deep: true });

function getPartnerOptions() {
  partnerOptions.value = partners.value;
  console.log('selected', selectedPartners)
}

function calculateCityPercentage(partners: PartnerMetricSchema[]) {
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

<style></style>
