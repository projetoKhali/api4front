<template>
    <div class="dashboard-container">
      <div class="left-side">
        <h2>Relatório de Parceiro</h2>
      <Table :headers="tableHeaders" :initialData="fullData"
      :pagination="pagination"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from '../components/Table.vue';
import { PartnerReportSchema } from '../schemas/partner/PartnerReport';
import { getPartnerReports } from '../service/PartnerReportService';
import { getPartners } from '../service/PartnerService';

//Colocar os campos que deseja ver:
const tableHeaders = ['Parceiro', 'Track' , 'Início da Track', 'Fim da Track', 'Expertise', 'Início da Expertise', 'Fim da Expertise', 'Qualifier', 'Início do Qualifier', 'Fim do Qualifier', 'Data de expiração qualifier'];
//total de paginas 
const totalPages = ref(0);
//numero de itens na pagina
const itemsPerPage: number = 10;
//
onMounted(() => fetchData(0));

type PartnerReportRow = [
  string,
  string,
  Date,
  Date,
  string,
  Date,
  Date,
  string,
  Date,
  Date,
  Date
];
const fullData = ref<PartnerReportRow[]>([]);

const pagination = {
  getTotalPages: () => totalPages.value,
  getPageData: ( pageIndex: number): Array<PartnerReportRow> => {
    return fetchData(pageIndex);
  },
};

const fetchData = async (pageIndex: number) => {
  try {
    const partnerPage = await getPartners(pageIndex, itemsPerPage);

    totalPages.value = partnerPage.totalPages;

    const data = partnerPage.content;
    const formatted: Array<PartnerReportRow> = data.map(
    (item: PartnerReportSchema) => [
      item.partner,
      item.track,
      item.trackStartDate,
      item.trackEndDate,
      item.expertise,
      item.expertiseStartDate,
      item.expertiseEndDate,
      item.qualifier,
      item.qualifierStartDate,
      item.qualifierEndDate,
      item.qualifierExpiration 
    ]);
    fullData.value = formatted;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
};



</script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100vh;
    padding: 20px;
    background-color: #ebf2e8;
    gap: 2%;
  }
  .left-side {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    gap: 10px;
  }
  
  .right-side {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  
  .chart-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width: 100%;
    gap: 2%;
    border-radius: 10px;
  }
  
  .progressbar-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    background: #fff;
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }
  
  .barchart-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    background: #fff;
  }
  
  .statcircle-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
  }
  
  .piechart-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }
  </style>
  