<template>
  <div class="dashboard-container">
    <div class="right-side">
      <div class="linechart-container">
        <LineChart :chartData="chartData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LineChart from '../components/charts/LineChart.vue';

const chartData = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
  datasets: [
    {
      label: 'Série 1',
      data: [10, 20, 15, 25, 30], // Valores para o eixo Y
      borderColor: 'blue', // Cor da linha
      borderWidth: 2, // Largura da linha
      fill: false, // Não preencher área abaixo da linha
    },
    {
      label: 'Série 2',
      data: [15, 25, 20, 30, 35], // Valores para o eixo Y
      borderColor: 'red', // Cor da linha
      borderWidth: 2, // Largura da linha
      fill: false, // Não preencher área abaixo da linha
    },
  ],
};
</script>

<style>
/* Estilos */
</style>
