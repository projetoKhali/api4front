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
import { defineProps, reactive, watch, toRefs } from 'vue';

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

const { chartData } = toRefs(props);

const chartOptions: ChartOptions<'line'> = reactive({
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11, // Defina o tamanho da fonte aqui
        },
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
    datalabels: {
      display: false,
    },
  },
});

const reactiveChartData = reactive<ChartData>({
  labels: [],
  datasets: [],
});

watch(
  chartData,
  newValue => {
    reactiveChartData.labels = newValue.labels;
    reactiveChartData.datasets = newValue.datasets.map(dataset => ({
      ...dataset,
    }));
  },
  { immediate: true },
);
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80%;
  padding: 10px;
}
* {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
