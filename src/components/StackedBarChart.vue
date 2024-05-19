<template>
    <li v-for=" label in props.labels" class="list-bar">
        // barra de expertizes na track
        <div class="bar" :style="getBarStyle(0)"> </div>
        <div class="bar" :style="getBarStyle(1)"> </div>
        <div class="bar" :style="getBarStyle(2)"> </div>
    </li>
    <div class="title">
        <h2>{{ title }}</h2>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        required: true
    }, 
    labels: {
        type: Array<String>,
        required: true
    },
    data: {
        type: Array<Array<Number>>,
        required: true
    }
})

const getBarStyle = (index: number) => {
    let barHeight = 0;
    const dadosVsSampleFactor = 0;
    return {
        height: `${barHeight * dadosVsSampleFactor}%`,
        backgroundColor: index === 0 ? 'blue' : index === 1 ? 'yellow' : 'green',
    };
}

</script>

<style scoped>
.list-bar {
    width: 100%;
    height: 50vh;
    margin: 0 10px;
}

.bar {
    width: 100%;
    height: 100%;
}
</style>