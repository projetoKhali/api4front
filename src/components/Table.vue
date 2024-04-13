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
    <table class="table">
        <thead>
            <tr class="title-table">
                <th v-for="(item, index) in $props.head" :key="index">
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody v-for="(obj_line, index) in $props.body" :key="index">
            <td v-for="(column, index) in obj_line" :key="index">
                {{ column }}
            </td>
        </tbody>
    </table>

</template>

<style scoped>
.table{
    background-color: #fff;
    border-radius: 9px;
    height: 233px;
    width: 800px;
    table-layout: fixed;
    overflow-y: scroll;

    font-family: "Inter", sans-serif;
    padding-top: 7px;
    padding-bottom: 20px;
}

.title-table{
    font-size: 20px;
}

th{
    vertical-align: top;
    line-height: auto;
    font-weight: 600;
    margin: 0;
    padding: 0;
}

td {
    line-height: 2.5;
}

</style>