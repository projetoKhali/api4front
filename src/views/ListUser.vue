<template>
  <div class="conteiner">
    <div class="table-list-partner">
      <div class="button-div">
        <button @click="() => addUser()">Adicionar um novo usuario +</button>
      </div>
      <h2>Lista de Usuários</h2>
      <Table
        ref="tableComponent"
        :headers="tableHeaders"
        :initialData="usersAtPage"
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
import { UserSchema, UserPostSchema } from '../schemas/User';
import { getUsers, createUser, updateUser } from '../service/UserService';
import FormPopup from '../components/form/FormPopup.vue';
import NotificationPopup, {
  PopupProps,
} from '../components/popup/NotificationPopup.vue';

const tableComponent = ref<Table>();
const tableHeaders = ['ID', 'Email', 'Nome', 'Tipo', 'Edição'];

const usersAtPage = ref<
  Array<[number, string, string, string, string, Function, Function]>
>([]);
const itemsPerPage: number = 10;
const totalPages = ref(0);
const isPopupOpen = ref(false);
const user = ref<UserSchema | UserPostSchema>();
const actions = ref<{ salvar: (user: UserSchema) => void }>();

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
    const usersPage = await getUsers(pageIndex, itemsPerPage);

    totalPages.value = usersPage.totalPages;

    const data = usersPage.content;
    const formatted: Array<
      [number, string, string, string, string, Function, Function]
    > = data.map((item: UserSchema) => [
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
            if (user.value === undefined) return;
            updateUser(user.value.id, user.value).then(
              tableComponent.value?.manualRefresh,
            );
            console.log('Valor user', user.value);
          },
        };
      },
    ]);
    usersAtPage.value = formatted;
  } catch (error) {
    openNotificationPopup({
      title: 'Ops, algo deu errado',
      text: 'Erro ao buscar dados da API.',
      type: 2,
    });
    console.error('Erro ao buscar dados da API:', error);
  }
};

onMounted(() => fetchData(0));

const pagination = {
  getTotalPages: () => totalPages.value,
  getPageData: (
    pageIndex: number,
  ): Array<[number, string, string, string, string, Function, Function]> => {
    return fetchData(pageIndex);
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
      try {
        createUser(user.value);
        console.log('Valor user', user.value);
        tableComponent.value?.manualRefresh();
        openNotificationPopup({
          title: 'Usuário criado!',
          text: '',
          type: 1,
        });
      } catch (error) {
        openNotificationPopup({
          title: 'Ops, algo deu errado',
          text: 'Erro ao criar usuário.',
          type: 2,
        });
        console.error('Erro ao criar usuário:', error);
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
