<script setup lang="ts">
import { ref, watch, onMounted, defineProps } from 'vue';
import axios from 'axios';

const props = defineProps({
  headers: {
    type: Array as () => Array<String>,
    required: true,
  },
  initialData: {
    type: Array as () => Array<Array<String>>,
    required: false,
  },
  pagination: {
    type: Object as () => Pagination,
    required: false,
  },
});

const currentPage = ref(0);
const data = ref([]);

onMounted(() => {
  watch(
    () => props.initialData,
    () => {
      data.value = props.initialData || props.pagination?.getPageData(0) || [];
    },
    { immediate: true },
  );

  return {
    currentPage,
    data,
  };
});

type Pagination = {
  getPageData: (pageIndex: number) => void;
  getTotalPages: () => number;
};
</script>

<template>
  <div class="scrollable-table">
    <table class="table">
      <thead>
        <tr>
          <th v-for="(header, headerIndex) in headers" :key="headerIndex">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="pagination" class="pagination-button">
    <div class="prev-button">
      <button
        v-if="currentPage > 0"
        @click="
          () => {
            currentPage--;
            data = pagination.getPageData(currentPage);
          }
        "
      >
        <div class="left-arrow"></div>
      </button>
    </div>
    <div class="view-pages">
      <span> {{ currentPage + 1 }} / {{ pagination.getTotalPages() }}</span>
    </div>
    <div class="next-button">
      <button
        v-if="currentPage < pagination.getTotalPages() - 1"
        @click="
          () => {
            currentPage++;
            data = pagination.getPageData(currentPage);
          }
        "
      >
        <div class="right-arrow"></div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollable-table {
  width: 100%;
  height: 100%;
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
  background-color: #a4a3a3;
  border-radius: 100px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.scrollable-table::-webkit-scrollbar-track {
  background-color: #d9d9d9;
  border-radius: 3px;
}

.scrollable-table::-webkit-scrollbar-thumb:hover {
  background-color: #a4a3a3;
}

.table {
  width: 100%;
  height: 100%;
  font-family: 'Inter', sans-serif;
  color: #000;
  padding: 0;
  border-spacing: 0;
}

tr {
  transition: background-color 0.1s ease;
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
  line-height: 3;
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

.prev-button,
.view-pages,
.next-button {
  margin: 10px;
}

.prev-button {
  float: left;
}

.next-button {
  float: right;
}

.view-pages {
  float: center;
}

button {
  display: flex;

  align-items: center;
  justify-content: center;
  color: #d9d9d9;
  height: 32px;
  width: 32px;

  border-radius: 100%;
  border: none;

  font-weight: 400;
  font-size: 24px;
  transition:
    color 0.3s,
    background-color 0.3s;
}

button:hover {
  background-color: #d9d9d9;
  color: #a4a3a3;
}

.left-arrow::before {
  content: '‹';
}

.right-arrow::before {
  content: '›';
}
</style>
