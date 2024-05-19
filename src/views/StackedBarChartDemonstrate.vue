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

function getBarHeight (data: Number[][]) {
    const heightList = [];
    // iterate over the data
    for (let i = 0; i < data.length; i++) {
        const dataAtIndex = data[i]!;
        // iterate over the data at index
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
            heightList.push(segmentHeight);
        }
    }
    return heightList;
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