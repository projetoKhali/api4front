<!-- PieChart.vue -->
<template>
  <div class="chart-container">
    <Pie :data="chartData" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { reactive, defineProps } from 'vue';

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

const chartData = reactive({
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
</script>

<style scoped>
.chart-container {
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-title {
  margin-bottom: 10px;
  color: black;
}
</style>
