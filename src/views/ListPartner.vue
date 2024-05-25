<template>
  <div class="container">
    <div class="table-list-partner">
      <div class="button-div">
        <button @click="() => addPartner()">
          Adicionar um novo Parceiro +
        </button>
      </div>
      <h2>Lista de Parceiros</h2>
      <Table
        ref="tableComponent"
        :headers="tableHeaders"
        :pagination="pagination"
      />
    </div>
  </div>
  <FormPopup
    v-if="isPopupOpen"
    :formActionTitle="'Criar Parceiro'"
    :data="partner"
    :actions="actions"
    :togglePopup="() => (isPopupOpen = !isPopupOpen)"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from '../components/Table.vue';
import { PartnerPostSchema, PartnerSchema } from '../schemas/Partner';
import {
  getPartners,
  createPartner,
  updatePartner,
} from '../service/PartnerService';
import FormPopup from '../components/form/FormPopup.vue';

const tableComponent = ref<Table>();
const tableHeaders = [
  'ID',
  'Código',
  'Empresa',
  'Nome do Admin',
  'Email do Admin',
  'Slogan',
  'País',
  'Cidade',
  'Endereço',
  'Conformidade',
  'Crédito',
  'Status',
  'Tipo de Membro',
  'Data de Início do Membro',
  'Dashboard Individual',
  'Edição',
];

type PartnerTableRow = [
  number,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  Function,
  Function,
];

const fullData = ref<PartnerTableRow[]>([]);
const itemsPerPage: number = 10;
const totalPages = ref(0);
const isPopupOpen = ref(false);
const partner = ref<PartnerSchema | PartnerPostSchema>();
const actions = ref<{ salvar: (user: PartnerSchema) => void }>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const fetchData = async (pageIndex: number) => {
  const partnersPage = await getPartners(pageIndex, itemsPerPage);

  totalPages.value = partnersPage.totalPages;

  const data = partnersPage.content;
  const formatted: Array<PartnerTableRow> = data.map((item: PartnerSchema) => [
    item.id,
    item.companyId,
    item.name,
    item.adminName,
    item.adminEmail,
    item.slogan,
    item.country,
    item.city,
    item.address,
    item.compliance ? 'Sim' : 'Não',
    item.credit ? 'Sim' : 'Não',
    item.status ? 'Ativo' : 'Inativo',
    item.memberType ? 'Sim' : 'Não',
    formatDate(item.firstDateMembership),
    `/partner/${item.id}`,
    () => {
      partner.value = item;
      isPopupOpen.value = !isPopupOpen.value;
      console.log('Print', partner);
      actions.value = {
        salvar: (_: PartnerSchema) => {
          if (partner.value === undefined) return;
          // const {id, ...partnerData} = partner.value;
          updatePartner(partner.value.id, partner.value).then(
            tableComponent.value?.manualRefresh,
          );
          console.log('Valor partner', partner.value);
        },
      };
    },
  ]);
  return fullData.value = formatted;
};

const pagination = {
  getTotalPages: () => totalPages.value,
  getPageData: async (pageIndex: number): Array<PartnerTableRow> => {
    return await fetchData(pageIndex);
  },
};

const goToDashboard = (partnerId: number) => {};

const addPartner = () => {
  const partnerPost: PartnerPostSchema = {
    companyId: '',
    name: '',
    adminName: '',
    adminEmail: '',
    slogan: '',
    country: '',
    city: '',
    address: '',
    compliance: false,
    credit: false,
    status: false,
    memberType: false,
  };
  partner.value = partnerPost;
  isPopupOpen.value = !isPopupOpen.value;
  actions.value = {
    salvar: (_: PartnerSchema) => {
      if (partner.value === undefined) {
        return;
      }
      createPartner(partner.value);
      console.log('Valor user', partner.value);
      tableComponent.value?.manualRefresh();
    },
  };
};
</script>

<style scoped>
.container {
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
}

button {
  width: 20%;
  height: 60px;
  /* cor de fundo */
  background-color: #7ea774;
  /* cor do texto */
  color: white;
  /* remove a borda */
  border: none;
  /* arredonda as bordas */
  border-radius: 5px;
  /* tamanho da fonte */
  font-size: 80%;
  /* cursor ao passar por cima */
  cursor: pointer;
  /* transição suave da cor de fundo */
  transition: background-color 0.3s;
}

.custom-button:hover {
  /* cor de fundo quando hover */
  background-color: #45a049;
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
