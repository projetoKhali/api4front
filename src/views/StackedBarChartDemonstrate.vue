<template>
    <div class="dashboard-container">
        <div class="stacked-bar-chart-container">
            <StackedBarChart :title="title" :labels="labels" :data="data" :height="height" />
        </div>
    </div>
</template>

<script setup lang="ts">
import StackedBarChart from '../components/StackedBarChart.vue';

const title = 'Track Shell'
const labels = ['Marcos', 'Tania', 'Paulo']
const data = [[22, 10, 5], [22, 13, 8], [22, 9, 8]]
const height = 200;

const getHeight = (barIndex: number, segmentIndex: number) => {
    const dataAtIndex = data[barIndex];

    if (!dataAtIndex || !dataAtIndex[segmentIndex]) {
        return {};
    }

    const total = dataAtIndex.reduce((a, b) => a + b, 0);
    const dataAtSegment = dataAtIndex[segmentIndex];

    if (!total || !dataAtSegment) {
        return {};
    }

    const segmentHeight = (dataAtSegment / total) * 100;

    return segmentHeight;
}
</script>

<style>
.dashboard-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.stacked-bar-chart-container {
    width: 200px;
    height: 200px;
}
</style>