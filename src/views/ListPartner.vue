<template>
    <div class="conteiner">
      <div class="table-list-partner">
        <h2>Lista de Parceiros</h2>
        <button @click="() => addPartner()"> Adicionar um novo Parceiro </button>
        <Table :headers="tableHeaders" :initialData="fullData" :pagination="pagination" />
    </div>
    </div>
    <Popup
        v-if="isPopupOpen"
        :TogglePopup="() => isPopupOpen  = !isPopupOpen"
    >
        <UserForm
        :formActionTitle="'Título do Formulário'"
        :user="partner"
        :actions="actions"
    ></UserForm>
</Popup>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Table from '../components/Table.vue';
  import { PartnerPostSchema, PartnerSchema } from '../schemas/Partner';
  import { createPartner, updatePartner } from '../service/PartnerService';
  import UserForm from '../components/form/UserForm.vue';
  import Popup from '../components/Popup.vue';

  
  
  const tableHeaders = [
    "ID", "Código", "Empresa", "Nome do Admin", "Email do Admin",
    "Slogan", "País", "Cidade", "Endereço", "Conformidade",
    "Crédito", "Status", "Tipo de Membro", "Data de Início do Membro", "Dashboard Individual", "Edição"
  ];
  
  const fullData = ref<Array<[number, string, string, string, string, string, string, string, string, string, string, string, string, string, Function, Function]>>([]);
  const itemsPerPage: number = 10;
  const isPopupOpen = ref(false);
  const partner = ref<PartnerSchema | PartnerPostSchema>();
  const actions = ref<{salvar: (user: PartnerSchema) => void }>();
  


  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/partner/list");
      const data = await response.json();
      const formatted: Array<[number, string, string, string, string, string, string, string, string, string, string, string, string, string, Function, Function]> = data.content.map((item: PartnerSchema) => ([
        item.id,
        item.companyId,
        item.name,
        item.adminName,
        item.adminEmail,
        item.slogan,
        item.country,
        item.city,
        item.address,
        item.compliance ? "Sim" : "Não",
        item.credit ? "Sim" : "Não",
        item.status ? "Ativo" : "Inativo",
        item.memberType ? "Premium" : "Gratuito",
        formatDate(item.firstDateMembership),
        () => {
          partner.value = item;
             isPopupOpen.value = !isPopupOpen.value;
             console.log("Print", partner)
             actions.value = {
                salvar: (_: PartnerSchema) => {
                    if (partner.value === undefined) {
                        return
                    }
                    const {id, ...partnerData} = partner.value;
                    updatePartner(id, partnerData)
                    console.log('Valor partner', partner.value)
                }
             }
        },
        () => {
          console.log('Edição:', item.id);
        }
      ]));
      fullData.value = formatted;
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };
  
  onMounted(fetchData);
  
  const pagination = {
    getTotalPages: () => Math.ceil(fullData.value.length / itemsPerPage),
    getPageData: (pageIndex: number): Array<[number, string, string, string, string, string, string, string, string, string, string, string, string, string, Function, Function]> => {
      const startIndex = pageIndex * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return fullData.value.slice(startIndex, endIndex);
    },
  };

  const goToDashboard = (partnerId: number) => {
};

const addPartner = () => {
    const partnerPost: PartnerPostSchema = {
      companyId: "",
      name: "",
      adminName: "",
      adminEmail: "",
      slogan: "",
      country: "",
      city: "",
      address: "",
      compliance: false,
      credit: false,
      status: false,
      memberType: false,
    }
    partner.value = partnerPost;
    isPopupOpen.value = !isPopupOpen.value;
    actions.value = {
        salvar: (_: PartnerSchema) => {
            if (partner.value === undefined) {
                return
            }
            createPartner(partner.value)
            console.log('Valor user', partner.value)
        }
    }
}
  </script>
  
  <style scoped>
  .conteiner {
    height: 100%;
    width: auto;
    padding: 20px;
    padding-top: 10px;
  }
  
  .table-list-partner {
    margin-top: 20px;
  }
  </style>
  