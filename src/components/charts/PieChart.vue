<template>
  <div class="chart-container">
    <Pie :data="chartData" :options="chartOptions" />
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
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Distribuição',
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
      formatter: (value: any, ctx: any) => {
        const total = ctx.chart.data.datasets[0].data.reduce(
          (a: any, b: any) => a + b,
          0,
        );
        const percentage = Math.round((value / total) * 100);
        return `${percentage}%`;
      },
    },
  },
});
let chartData = reactive({
  labels: Object.keys(props.chartData),
  datasets: [
    {
      label: 'Fat',
      data: Object.values(props.chartData),
      backgroundColor: ['#C76146', '#8d4428', '#efc371'],
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
          backgroundColor: ['#C76146', '#8d4428', '#efc371'],
        },
      ],
      ...chartOptions,
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
