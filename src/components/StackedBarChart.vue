<template>
    <div class="conteiner">
        <div class="chart">
            <div v-for="(bar, i) in data" class="bar-container">
                <div v-for="(segment, j) in bar" class="bar-segment" :style="getBarStyle(i, j+1)"></div>
            </div>
        </div>
        <div class="title">
            <h2>{{ title }}</h2>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    itens: {
        type: Array<String>,
        required: true
    },
    data: {
        type: Array<Array<Number>>,
        required: true
    },
    height: {
        type: Number,
        required: true
    }
})

// exemplo de dado
const title = 'Track Shell'
const label = ['Marcos', 'Tania', 'Paulo']
const data = [[22, 10, 5], [22, 13, 8], [22, 9, 8]]

const getBarStyle = (barIndex: number, segmentIndex: number) => {
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

    return {
        // height: props.height,
        // backgroundColor: segmentIndex === 0 ? 'none' : segmentIndex === 1 ? '#B46BC2' : '#94DF49',
        // 'border-radius': segmentIndex === 1 ? '2vh 2vh 0 0' : '0 0 0 0',

        height: `${segmentHeight}%`,
        backgroundColor: segmentIndex === 0 ? 'none' : segmentIndex === 1 ? 'yellow' : 'green',
        'border-radius': segmentIndex === 1 ? '2vh 2vh 0 0' : '0 0 0 0',
    };
}
</script>

<style scoped>
/* TODO: ajustar estilo */
.conteiner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
}

.bar-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 20%;
    height: 30vh;
    margin: 0 10px;
}

.chart {
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style-type: none;
    width: 100%;
}

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