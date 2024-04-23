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
      position: 'bottom',
    },
    title: {
      display: true,
      text: props.title || 'Avanço das Expertises por Status',
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
      backgroundColor: Object.keys(props.chartData).map(() => getRandomColor()),
    },
  ],
});

function getRandomColor() {
  const greenTones = ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9'];
  const purpleTones = ['#9C27B0', '#AB47BC', '#BA68C8', '#CE93D8', '#E1BEE7'];
  const colors = Math.random() < 0.5 ? greenTones : purpleTones;
  return colors[Math.floor(Math.random() * colors.length)];
}

watch(
  () => props.chartData,
  newValue => {
    chartData = {
      labels: Object.keys(newValue),
      datasets: [
        {
          label: 'Expertises',
          data: Object.values(newValue),
          backgroundColor: Object.keys(newValue).map(() => getRandomColor()),
        },
      ],
    };
  },
);
</script>

<style scoped>
.chart-container {
  box-shadow: 0px 4px 0 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 90%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}

.chart-title {
  margin-bottom: 10px;
  color: black;
}
</style>
