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
    height: 300px;
    width: 100%;
    overflow-y: auto;
    border-radius: 9px;
}



.table {
    background-color: #fff;
    width: 100%;
    table-layout: fixed;
    margin: 0;

    font-family: "Inter", sans-serif;
    padding-bottom: 20px;
}

.table th {
    background-color: #fff;
    position: sticky;
    top: 0;
}

th {
    font-size: 20px;
    vertical-align: top;
    font-weight: 600;
    height: 100%;
}

td {
    line-height: 2.5;
}
</style>