<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import { reactive, watch } from 'vue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const props = defineProps<{
  chartData: Record<string, number>;
}>();

const chartOptions: ChartOptions<'bar'> = reactive({
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        display: false,
      },
      display: false,
    },
    x: {
      ticks: {
        display: true,
      },
      barThickness: 'absolute',
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
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
      display: true,
      color: 'black',
      align: 'end',
      anchor: 'end',
      formatter: (value: any) => {
        return value + '%';
      },
      font: {
        size: 12,
        weight: 'bold',
      },
    },
  },
});

const defaultDatasetOptions = {
  backgroundColor: '#443054',
  borderColor: '#EBF2E8',
  borderWidth: 1,
};

let chartData: ChartData = reactive({
  labels: Object.keys(props.chartData),
  datasets: [
    {
      label: 'Progresso',
      data: Object.values(props.chartData),
      ...defaultDatasetOptions,
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
          label: 'Progresso',
          data: Object.values(newValue),
          ...defaultDatasetOptions,
        },
      ],
    };
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
*{
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
 }
</style>
