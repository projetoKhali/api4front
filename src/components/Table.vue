<script setup lang="ts">

const props = defineProps({
  head: {
    type: Array as () => Array<String>,
    required: true,
  },
  body: {
    type: Array as () => Array<any>,
    required: true,
  },
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
  height: 180px;

  padding-right: 10px;
  overflow-y: auto;
  border-radius: 9px;
  background-color: #fff;

  scrollbar-width: 7px;
  scrollbar-color: transparent;
  box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.1);
}

.table {
  table-layout: fixed;
  width: 100%;
  margin: 0;

  font-family: 'Inter', sans-serif;
  color: #000;
  padding-bottom: 20px;
}

.table th {
  padding-top: 7px;
  background-color: #fff;
  position: sticky;
  padding-bottom: 25px;
  top: 0;
}

th {
  font-size: 16px;
  vertical-align: top;
  text-align: center;
  font-weight: 600;
  height: 100%;
}

td {
  line-height: 2.5;
}

.scrollable-table::-webkit-scrollbar {
  width: 7px;
}

.scrollable-table::-webkit-scrollbar-thumb {
  background-color: #a4a3a3;
  height: 46px;
  border-radius: 4px;
}
</style>
