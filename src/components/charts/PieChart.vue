<template>
  <div class="chart-container">
    <Pie :data="chartData" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { reactive, watch } from 'vue';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const props = defineProps<{
  chartData: Record<string, number>;
  title?: string;
}>();

const chartOptions = reactive({
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'left',
    },
    title: {
      display: true,
      text: 'Avanço das Expertises por Status',
      color: 'black',
      font: {
        size: 18,
        weight: 'bold',
      },
      padding: {
        top: 20,
        bottom: 10,
      },
    },
    tooltip: {
      enabled: true,
    },
    datalabels: {
      display: true,
      formatter: (value: any) => `${value}%`,
    },
  },
});
let chartData = reactive({
  labels: Object.keys(props.chartData),
  datasets: [
    {
      label: 'Expertises',
      data: Object.values(props.chartData),
      backgroundColor: ['#928b7A','#855c38', '#9d96a8'],
    },
  ],
});

watch(
  () => props.chartData,
  newValue => {
    chartData = {
      labels: Object.keys(newValue),
      datasets: [
        {
          label: 'Expertises',
          data: Object.values(newValue),
          backgroundColor: ['#9d96a8','#855c38', '#928b7A'],
        },
      ],
    };
  },
);

</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
	border-radius: 10px;
}

.chart-title {
  margin-bottom: 10px;
  color: black;
}
</style>
