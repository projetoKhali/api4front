<script setup lang="ts">
import { ref } from 'vue';
import Table from '../components/Table.vue';

const tableHeaders = ['id', 'name', 'age', 'url', 'editar'];
const fullData = [
  [1, 'John Doe', 25, '/track', user => processUser(user)],
  [2, 'Jane Doe', 24, '/partner', user => processUser(user)],
  [3, 'John Smith', 30, '/track', user => processUser(user)],
  [4, 'Jane Smith', 29, '/track', user => processUser(user)],
  [5, 'John Brown', 35, '/track', user => processUser(user)],
  [6, 'Jane Brown', 34, '/track', user => processUser(user)],
  [7, 'John White', 40, '/track', user => processUser(user)],
  [8, 'Jane White', 39, '/track', user => processUser(user)],
  [9, 'John Black', 45, '/track', user => processUser(user)],
  [10, 'Jane Black', 44, '/track', user => processUser(user)],
];

const processUser = (user: Object): void => {
  console.log('User:', user);
  console.log('typeof user:', typeof user)
};

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
  <Table :headers="tableHeaders" :pagination="pagination" />
</template>
