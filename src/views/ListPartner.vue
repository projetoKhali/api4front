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
        ref="tableComponent"
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
  <NotificationPopup
    v-if="showPopup"
    :title="notification.title"
    :message="notification.message"
    :type="notification.type"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Table from '../components/Table.vue';
import { PartnerPostSchema, PartnerSchema } from '../schemas/Partner';
import {
  getPartners,
  createPartner,
  updatePartner,
} from '../service/PartnerService';
import FormPopup from '../components/form/FormPopup.vue';
import NotificationPopup, {
  PopupProps,
} from '../components/popup/NotificationPopup.vue';

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

const showPopup = ref(false);
const notification: PopupProps = {
  title: '',
  message: '',
  type: 1,
  time: 3000,
};

const openNotificationPopup = ({ title, message, type }: PopupProps) => {
  notification.title = title;
  notification.message = message;
  notification.type = type;
  showPopup.value = true;
};

watch(showPopup, newValue => {
  if (newValue) {
    setTimeout(() => {
      showPopup.value = false;
    }, notification.time);
  }
});

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
              updatePartner(partner.value.id, partner.value).then(
                tableComponent.value?.manualRefresh,
              );
            },
          };
        },
      ],
    );
    fullData.value = formatted;
  } catch (error) {
    openNotificationPopup({
      title: 'Ops, algo deu errado',
      message: 'Erro ao buscar dados da API.',
      type: 2,
    });
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
    salvar: async (_: PartnerSchema) => {
      if (partner.value === undefined) {
        return;
      }
      try {
        console.log('Valor user', partner.value);
        await createPartner(partner.value);
        tableComponent.value?.manualRefresh();
        openNotificationPopup({
          title: 'Parceiro criado!',
          message: '',
          type: 1,
        });
      } catch (error) {
        openNotificationPopup({
          title: 'Ops, algo deu errado',
          message: 'Erro ao criar parceiro.',
          type: 2,
        });
        console.error('Erro ao criar parceiro:', error);
      }
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
  background-color: #7ea774;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 80%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-button:hover {
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
