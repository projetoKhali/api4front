<script setup lang="ts">
import { ref } from 'vue';
import Table from '../components/Table.vue';

const tableHeaders = ['id', 'name', 'age'];
const fullData = [
  [1, 'John Doe', 25],
  [2, 'Jane Doe', 24],
  [3, 'John Smith', 30],
  [4, 'Jane Smith', 29],
  [5, 'John Brown', 35],
  [6, 'Jane Brown', 34],
  [7, 'John White', 40],
  [8, 'Jane White', 39],
  [9, 'John Black', 45],
  [10, 'Jane Black', 44],
];

const itemsPerPage: number = 3;

const pagination = {
  getTotalPages: (): number => Math.ceil(fullData.length / 3),
  getPageData: (pageIndex: number): Object[] => {
    return fullData.slice(
      pageIndex * itemsPerPage,
      pageIndex * itemsPerPage + itemsPerPage,
    );
  },
};
</script>

<template>
  <Table
    :headers="tableHeaders"
    :pagination="pagination"
  />
</template>
