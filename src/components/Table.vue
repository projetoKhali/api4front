<script setup lang="ts">
import { computed, defineProps, ref } from "vue";

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

const itemsPerPage = 12;
const currentPage = ref(1)

const paginatedBody = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return props.body.slice(start, end)
});

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}
    
const nextPage = () => {
    if (currentPage.value < Math.ceil(props.body.length / itemsPerPage)) {
        currentPage.value++
    }
}
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
                <tr v-for="(line, index) in paginatedBody" :key="index">
                    <td v-for="(cell, index) in line" :key="index">
                        {{ cell }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="pagination-button">
        <button @click="previousPage">Anterior</button>
        <button @click="nextPage" class="pg_btn">Próximo</button>
    </div>
</template>


<style scoped>
.scrollable-table {
    width: 100%;
    height: 260px;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 9px;
    box-shadow: 0px 5px 5px 0 rgba(0, 0, 0, 0.1);
    scrollbar-width: 7px;
    scrollbar-color: transparent;
}

.scrollable-table::-webkit-scrollbar {
    width: 7px;
}
.scrollable-table::-webkit-scrollbar-thumb {
    background-color: #A4A3A3;
    border-radius: 100px;
    border: 2px solid transparent;
    background-clip: content-box;
}

.scrollable-table::-webkit-scrollbar-track {
    background-color: #D9D9D9;
    border-radius: 3px;
}

.scrollable-table::-webkit-scrollbar-thumb:hover {
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

.pagination-button{
    display: flex;
    justify-content: space-between;
}
</style>