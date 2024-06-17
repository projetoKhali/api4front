<template>
  <div class="conteiner">
    <div class="table-list-partner">
      <h2>Lista de Tracks</h2>
      <Table :headers="tableHeaders" :initialData="fullData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from '../components/Table.vue';
import { TrackSchema } from '../schemas/Track';
import { getListPath } from '../router';

const tableHeaders = ['ID', 'Nome', 'Data de criação', 'Dashboard'];

const fullData = ref<Array<[number, string, string, string]>>([]);

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8080/track');
    const data = await response.json();
    const formatted: Array<[number, string, string, string]> = data.map(
      (item: TrackSchema) => [
        item.id,
        item.name,
        item.insertDate,
        `/dashboard/${getListPath('track')}${item.id}`,
      ],
    );
    fullData.value = formatted;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
};

onMounted(fetchData);
</script>

<style scoped>
.conteiner {
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 100%;
  width: 100%;
  padding-top: 10px;
  background-color: #ebf2e8;
}

.table-list-partner {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  min-height: 40%;
}

* {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
