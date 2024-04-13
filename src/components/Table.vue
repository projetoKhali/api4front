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
    <div class="table">
        <thead>
            <tr>
                <th v-for="(item, index) in $props.head" :key="index">
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody class="row" v-for="(obj_line, index) in $props.body" :key="index">
            <td v-for="(column, index) in obj_line" :key="index">
                {{ column }}
            </td>
        </tbody>
    </div>
</template>

<style scoped>
.table{
    display: flex;
    flex-direction: column;
}


.row{
    display: flex;
    justify-content: space-evenly;
}

</style>