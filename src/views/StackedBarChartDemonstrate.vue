<template>
  <div class="dashboard-container">
    <div class="stacked-bar-chart-container">
      <StackedBarChart
        :title="title"
        :itens="itens"
        :data="data"
        :height="height"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import StackedBarChart from '../components/StackedBarChart.vue';

const title = 'Track Shell';
const itens = ['Marcos', 'Tania', 'Paulo'];
const data = [
  [22, 21, 5],
  [22, 13, 8],
  [22, 9, 8],
];

const height = (() => {
  const heightList = [];
  for (let i = 0; i < data.length; i++) {
    const listAtIndex = [];
    const dataAtIndex = data[i]!;
    for (let j = 0; j < dataAtIndex.length; j++) {
      if (!dataAtIndex || !dataAtIndex[j]) {
        continue;
      }
      const total = dataAtIndex.reduce((a, b) => a + b, 0);
      const dataAtSegment = dataAtIndex[j];

      if (!total || !dataAtSegment) {
        continue;
      }
      const segmentHeight = (dataAtSegment / total) * 100;
      listAtIndex.push(segmentHeight);
    }
    heightList.push(listAtIndex);
  }
  return heightList;
})();
</script>

<style>
body {
  background-color: #f4edf7;
}

.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #4f25c4;
}

.stacked-bar-chart-container {
  width: 200px;
  height: 200px;
  background-color: #f4edf7;
  border-radius: 8px;
}
</style>
