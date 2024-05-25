<script lang="ts">
import { ref, watch, onMounted, defineProps } from 'vue';

// https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async#38510353
const AsyncFunction = (async () => {}).constructor;

const currentPage = ref(0);
const data = ref([]);

type Pagination = {
  getPageData: (pageIndex: number) => void;
  getTotalPages: () => number;
};

export default {
  props: {
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
  },
  setup(props) {
    const manualRefresh = () => {
      data.value = props.pagination?.getPageData(currentPage.value) || [];
    };

    watch(
      () => props.initialData,
      () => {
        data.value = props.initialData || [];

        if (props.pagination?.getPageData) {
          const pageFunction = props.pagination?.getPageData;

          if (pageFunction instanceof AsyncFunction) {
            props.pagination.getPageData(0).then(value => (data.value = value));
          } else {
            data.value = pageFunction(0);
          }
        }
      },
      { immediate: true },
    );
    return {
      manualRefresh,
      currentPage,
      data,
    };
  },
};
</script>

<template>
  <div class="container">
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
              <button
                v-if="typeof cell === 'function'"
                @click="() => cell(row)"
              >
                {{ headers[cellIndex] }}
              </button>
              <div v-else-if="typeof cell === 'string' && cell.startsWith('/')">
                <router-link :to="cell">{{ headers[cellIndex] }}</router-link>
              </div>
              <div v-else>
                {{ cell }}
              </div>
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
            async () => {
              currentPage--;
              data = await pagination.getPageData(currentPage);
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
            async () => {
              currentPage++;
              data = await pagination.getPageData(currentPage);
            }
          "
        >
          <div class="right-arrow"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.scrollable-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 9px;
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
  font-size: 0.7rem;
  vertical-align: top;
  background-color: #c4a57b;
  padding: 16px;
  color: #f9f3ea;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.table td {
  background-color: #fff;
  top: 0;
  font-size: 0.7rem;
  vertical-align: top;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}

.table td button {
  background-color: transparent;
  width: 100%;
  border: none;
  color: #007bff;
  cursor: pointer;
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
  height: 30px;
  width: 32px;

  border-radius: 100%;
  border: none;

  font-weight: 400;
  font-size: 12px;
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
