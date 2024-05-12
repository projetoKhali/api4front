<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ChartOptions,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { defineProps, reactive, watch } from 'vue';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
);

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
    fill: boolean;
  }[];
}

const props = defineProps<{
  chartData: ChartData;
}>();

const chartOptions: ChartOptions<'line'> = reactive({
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        display: true,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      enabled: true,
    },
    title: {
      display: true,
      text: 'Progresso por Track',
      color: 'black',
      font: {
        size: 18,
        weight: 'bold',
      },
    },
    datalabels: {
      display: false,
    },
  },
});

const chartData = reactive<ChartData>({
  labels: props.chartData.labels,
  datasets: props.chartData.datasets.map(dataset => ({ ...dataset })),
});

watch(
  () => props.chartData,
  newValue => {
    chartData.labels = newValue.labels;
    chartData.datasets = newValue.datasets.map(dataset => ({ ...dataset }));
  },
);
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 300px;
}
* {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
