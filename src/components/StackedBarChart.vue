<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Bar } from 'vue-chartjs';

const props = defineProps({
    title:{
        type: String,
        required: true
    },
    section:{
        type: Array<String>,
        required: true
    },
    data:{
        type: Array<Array<Number>>,
        required: true
    }
})

let chart = ref(null)

// rook que ao montar o componente, ele cria o gráfico
onMounted(() => {

})

</script>

<template>
    <div>
        <canvas id="stackedBarChart"></canvas>
    </div>
</template>
