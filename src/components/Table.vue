<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
    head: {
        type: Array as () => Array<String>,
        required: true
    },
    body: {
        type: Array as () => Array<any>,
        required: true
    }
});
</script>

<template>
    <div class="scrollable-table">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(item, index) in $props.head" :key="index">
                        {{ item }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(line, index) in $props.body" :key="index">
                    <td v-for="(cell, index) in line" :key="index">
                        {{ cell }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.scrollable-table {
    width: 100%;
    height: 260px;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 9px;
    box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.1);
    scrollbar-width: 7px;
    scrollbar-color: transparent;
}

.scrollable-table::-webkit-scrollbar {
    width: 7px;
}

.scrollable-table::-webkit-scrollbar-thumb {
    background-color: #A4A3A3;
}

.table {
    table-layout: fixed;
    width: 100%;
    height: 100%;
    font-family: "Inter", sans-serif;
    color: #000;
    padding: 0;
    border-spacing: 0;
}

tr {
    transition: background-color 0.1s ease; /* Adicione esta linha */
}

tr:hover {
    background-color: #e2e2e2;
}

.table th {
    background-color: #fff;
    position: sticky;
    top: 0;
    font-size: 20px;
    font-weight: 600;
    vertical-align: top;
    height: 40px;
}

.table td {
    line-height: 2.5;
}

.table th, .table td {
    text-align: center;
    vertical-align: middle;
}
</style>