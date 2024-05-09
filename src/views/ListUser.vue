<template>
  <div class="conteiner">
    <div class="table-list-partner">
      <div class="button-div">
        <button @click="() => addUser()">Adicionar um novo usuario +</button>
      </div>
      <h2>Lista de Usuários</h2>
      <Table
        :headers="tableHeaders"
        :initialData="fullData"
        :pagination="pagination"
      />
    </div>
  </div>
  <FormPopup
    v-if="isPopupOpen"
    :formActionTitle="'Criar Usuário'"
    :data="user"
    :actions="actions"
    :togglePopup="() => (isPopupOpen = !isPopupOpen)"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from '../components/Table.vue';
import { UserSchema, UserPostSchema } from '@/schemas/User';
import { createUser, updateUser } from '../service/UserService';
import FormPopup from '../components/form/FormPopup.vue';

const tableHeaders = ['ID', 'Email', 'Nome', 'Type', 'Edição'];

const fullData = ref<
  Array<[number, string, string, string, string, Function, Function]>
>([]);
const itemsPerPage: number = 10;
const isPopupOpen = ref(false);
const user = ref<UserSchema | UserPostSchema>();
const actions = ref<{ salvar: (user: UserSchema) => void }>();

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/list');
    const data = await response.json();
    const formatted: Array<
      [number, string, string, string, string, Function, Function]
    > = data.content.map((item: UserSchema) => [
      item.id,
      item.login,
      item.name,
      item.profileType,
      () => {
        user.value = item;
        isPopupOpen.value = !isPopupOpen.value;
        console.log('Print', user);
        actions.value = {
          salvar: (_: UserSchema) => {
            if (user.value === undefined) {
              return;
            }
            // const {id, ...userData} = user.value;
            updateUser(user.value.id, user.value);
            console.log('Valor user', user.value);
          },
        };
      },
    ]);
    fullData.value = formatted;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
};

onMounted(fetchData);

const pagination = {
  getTotalPages: () => Math.ceil(fullData.value.length / itemsPerPage),
  getPageData: (
    pageIndex: number,
  ): Array<[number, string, string, string, string, Function, Function]> => {
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return fullData.value.slice(startIndex, endIndex);
  },
};

const addUser = () => {
  const userPost: UserPostSchema = {
    name: '',
    login: '',
    password: '',
    profileType: 'PartnerAdmin',
  };
  user.value = userPost;
  isPopupOpen.value = !isPopupOpen.value;
  actions.value = {
    salvar: (_: UserSchema) => {
      if (user.value === undefined) {
        return;
      }
      createUser(user.value);
      console.log('Valor user', user.value);
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
