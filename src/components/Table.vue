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
  width: 300px;
  height: 233px;

  padding-right: 10px;
  overflow-y: auto;
  border-radius: 9px;
  background-color: #fff;

  scrollbar-width: 7px; /* Ajusta a largura da barra de rolagem */
  scrollbar-color: transparent; /* Ajusta a cor do polegar e da trilha da barra de rolagem */
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
  font-size: 20px;
  vertical-align: top;
  font-weight: 600;
  height: 100%;
}

td {
  line-height: 2.5;
}

/* Estiliza a barra de rolagem para Chrome, Safari e Opera */
.scrollable-table::-webkit-scrollbar {
  width: 7px;
}

.scrollable-table::-webkit-scrollbar-thumb {
  /*scroller*/
  background-color: #a4a3a3;
  height: 46px;
  border-radius: 4px;
}
</style>
