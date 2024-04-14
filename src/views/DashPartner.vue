<template>
  <div class="dashboard-container">
    <div class="chart-wrapper">
      <BarChart :chartData="barChartData" />
    </div>
    <div class="chart-wrapper">
      <PieChart :chartData="pieChartData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BarChart from '../components/charts/BarChart.vue';
import PieChart from '../components/charts/PieChart.vue';

const barChartData = {
  'Cloud Sell': 65,
  'Cloud Build': 59,
  'Cloud 2': 75,
  'Cloud 4': 100,
};

const pieChartData = {
  'Finaizados': 20,
  'Em progresso': 12,
  'Não iniciou': 5,
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.chart-wrapper {
  flex: 1;
}
</style>
