<template>
  <div>
    <BarChart :chartData="data" />
  </div>
  <HelloWorld msg="Vite + Vue" />

  <CountCard titulo="Total de qualificadores" :numero="150"></CountCard>
  <CountCard titulo="Total de expertize" :numero="34"></CountCard>
  <CountCard titulo="Total de parceiros" :numero="9.856"></CountCard>
</template>

<script setup lang="ts">
import BarChart from '../components/charts/BarChart.vue';

const data = {
  "Cloud Sell": 65,
  "Cloud Build": 59,
  "Cloud 2": 75,
  "Cloud 4": 100,
};

</script>
