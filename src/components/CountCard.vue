<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    title: String,
    number: Number
})
</script>

<template>
    <div class="count-card">
        <h3 class="title-card">{{ title }}</h3>
        <h1 class="number-card">{{ number }}</h1>
    </div>
</template>

<style scoped>
.count-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7;

    margin: 0;
    padding: 0;

    width: 247px;
    height: 133px;
    border-radius: 9px;

    background-color: #ffffff;
    box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.1);
    border: 3px solid transparent;
    transition: border-color 0.3s, transform 0.3s;
}

.count-card:hover {
    transform: scale(1.05);
}

.title-card {
    margin: 20px 0 0 0;

    font-size: 20px;
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-variation-settings: "slnt" 0;
    color: #000;
}

.number-card {
    margin: 0px 0px 26px 0px;

    font-size: 48px;
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-variation-settings: "slnt" 0;
    color: #000;
}
</style>