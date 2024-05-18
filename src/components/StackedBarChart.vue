<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Bar } from 'vue-chartjs';

const props = defineProps({
    title:{
        type: String,
        required: true
    },
    labels:{
        type: Array<String>,
        required: true
    },
    data:{
        type: Array<Array<Number>>,
        required: true
    }
})

let chart = Bar;

onMounted(() => {
    const datasets = props.data.map((dataset, index) => ({
        label: props.labels[index],
        data: dataset,
        backgroundColor: '#'+(Math.random()*0xFFFFFF<<0).toString(16), // random color for each bar
    }));

    chart.value = new Bar(document.getElementById('stackedBarChart'), {
        type: 'bar',
        data: {
            labels: props.labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: props.title
            },
            scales: {
                x: {
                    beginAtZero: true,
                    stacked: true,
                },
                y: {
                    beginAtZero: true,
                    stacked: true
                }
            }
        }
    });
})

</script>

<template>
    <div>
        <canvas id="stackedBarChart"></canvas>
    </div>
</template>
