<template>
  <div>
    <BarChart :chartData="data" />
  </div>
</template>

<script setup lang="ts">
import BarChart from './components/charts/BarChart.vue';

const data = {
  "Cloud Sell": 0.65,
  "Cloud Build": 0.59,
};

</script>
