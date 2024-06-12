<template>
    <div class="dashboard-container">
      <div class="left-side">
        <h2>Relatório de Parceiro</h2>
        <div class="button-div">
        <button>
          Extrair Relatório
        </button>
      </div>
      <Table :headers="tableHeaders" :initialData="fullData"
      :pagination="pagination"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from '../components/Table.vue';
import { getPartnerReports } from '../service/PartnerReportService';
import { PartnerReportSchema } from '../schemas/partner/PartnerReport';

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
    const partnerPage = await getPartnerReports(pageIndex, itemsPerPage);

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
  button {
  width: 20%;
  height: 60px;
  background-color: #7ea774; /* cor de fundo */
  color: white; /* cor do texto */
  border: none; /* remove a borda */
  border-radius: 5px; /* arredonda as bordas */
  font-size: 80%; /* tamanho da fonte */
  cursor: pointer; /* cursor ao passar por cima */
  transition: background-color 0.3s; /* transição suave da cor de fundo */
}

.custom-button:hover {
  background-color: #45a049; /* cor de fundo quando hover */
}

.button-div {
  display: flex;
  flex-direction: column;
  align-items: right;
  width: 100%;
  height: 9%;
  padding-bottom: 10px;
  padding-top: 10px;
}

* {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
  </style>
  