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

</script>

<template>
    <div v-for=" label in props.labels">
    </div>
    <div class="title">
        <h2>{{ title }}</h2>
    </div>
</template>