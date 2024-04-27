<script setup lang="ts">
import { ref, watch, defineProps } from "vue";
import axios from "axios";

const props = defineProps({
    head: {
        type: Array as () => Array<String>,
        required: true
    },
    route: {
        type: String,
        required: true
    }
});

const itemsPerPage = 10;
const currentPage = ref(0);
const body = ref([]);
const totalPages = ref(0);

const showPrevButton = ref(true);
const showNextButton = ref(true);


const fetchData = async () => {
    try {
        const response = await axios.get(props.route, {
            params: {
                page: currentPage.value,
                itemsPerPage: itemsPerPage
            }
        });
        body.value = response.data.content;   
        totalPages.value = response.data.totalPages;
        
        // atualiza a visibilidade dos botões de paginação
        showPrevButton.value = currentPage.value > 0;
        showNextButton.value = currentPage.value < totalPages.value - 1;
    } catch (error) {
        console.error('Error fetching data', error);
    }    
};

watch(currentPage, fetchData, { immediate: true });

const previousPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
        currentPage.value++;
    }
};
</script>

<template>
    <div class="scrollable-table">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(item, index) in head" :key="index">
                        {{ item }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(line, index) in body" :key="index">
                    <td v-for="(cell, key) in line" :key="key">
                        {{ cell }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="pagination-button">
        <button @click="previousPage" v-if="showPrevButton">Anterior</button>
        <button @click="nextPage" v-if="showNextButton">Próximo</button>
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
    transition: background-color 0.1s ease;
    /* Adicione esta linha */
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

.table th,
.table td {
    text-align: center;
    vertical-align: middle;
}

.pagination-button {
    display: flex;
    justify-content: space-between;
}
</style>
