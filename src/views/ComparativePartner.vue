<template>
  <div class="dashboard-container">
    <div class="left-side">
      <div class="card flex justify-content-center">
        <MultiSelect
          v-model="selectedCities"
          display="chip"
          :options="cities"
          optionLabel="name"
          placeholder="Select Cities"
          :maxSelectedLabels="3"
        />
      </div>
    </div>
    <div class="right-side"></div>
  </div>
</template>

<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import { ref } from 'vue';

const selectedCities = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
]);
</script>

<style></style>
