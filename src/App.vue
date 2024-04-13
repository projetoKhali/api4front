<template>
  <div>
    <BarChart :chartData="data" />
  </div>
</template>

<script setup lang="ts">
import BarChart from './components/charts/BarChart.vue';

const data = {
  "Cloud Sell": 65,
  "Cloud Build": 59,
  "Cloud 2": 75,
  "Cloud 4": 100,
};

</script>
