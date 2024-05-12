<template>
  <div class="conteiner">
    <div class="table-list-partner">
      <div class="button-div">
        <button @click="() => addPartner()">
          Adicionar um novo Parceiro +
        </button>
      </div>
      <h2>Lista de Parceiros</h2>
      <Table
        :headers="tableHeaders"
        :initialData="fullData"
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
  try {
    const partnersPage = await getPartners(pageIndex, itemsPerPage);

    totalPages.value = partnersPage.totalPages;

    const data = partnersPage.content;
    const formatted: Array<PartnerTableRow> = data.map(
      (item: PartnerSchema) => [
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
              updatePartner(partner.value.id, partner.value);
              console.log('Valor partner', partner.value);
            },
          };
        },
      ],
    );
    fullData.value = formatted;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
};

onMounted(() => fetchData(0));

const pagination = {
  getTotalPages: () => totalPages.value,
  getPageData: (pageIndex: number): Array<PartnerTableRow> => {
    return fetchData(pageIndex);
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
    },
  };
};
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
