<script lang="ts">
import { ref } from 'vue';
import Table from '../components/Table.vue';
import FormPopup from '../components/form/FormPopup.vue';
import User from '../schemas/User';

const tableHeaders = ['id', 'name', 'age', 'url', 'editar'];
const fullData = [
  [1, 'John Doe', 25, 'dashboard/track/1', user => processUser(user)],
  [2, 'Jane Doe', 24, 'dashboard/partner/2', user => processUser(user)],
  [3, 'John Smith', 30, 'dashboard/track/3', user => processUser(user)],
  [4, 'Jane Smith', 29, 'dashboard/track/4', user => processUser(user)],
  [5, 'John Brown', 35, 'dashboard/track/5', user => processUser(user)],
  [6, 'Jane Brown', 34, 'dashboard/track/6', user => processUser(user)],
  [7, 'John White', 40, 'dashboard/track/7', user => processUser(user)],
  [8, 'Jane White', 39, 'dashboard/track/8', user => processUser(user)],
  [9, 'John Black', 45, 'dashboard/track/9', user => processUser(user)],
  [10, 'Jane Black', 44, 'dashboard/track/10', user => processUser(user)],
];

const isPopupOpen = ref(false);

const processUser = (user: Object): void => {
  userInPopup.value = {
    name: user[1],
    age: user[2],
  };
  isPopupOpen.value = true;
};

const userInPopup: ref<User | null> = ref();

const actions = {
  cancel: (data: User) => {
    console.log('Data canceled:', data);
  },
  submit: (data: User) => {
    console.log('Data submitted:', data);
  },
};

const itemsPerPage: number = 3;

const pagination = {
  getTotalPages: (): number => Math.ceil(fullData.length / 3),
  getPageData: (pageIndex: number): Object[] => {
    return fullData.slice(
      pageIndex * itemsPerPage,
      pageIndex * itemsPerPage + itemsPerPage,
    );
  },
};

export default {
  components: {
    Table,
    FormPopup,
  },
  setup() {
    return {
      tableHeaders,
      pagination,
      isPopupOpen,
      userInPopup,
      actions,
    };
  },
};
</script>

<template>
  <Table :headers="tableHeaders" :pagination="pagination" />
  <FormPopup
    v-if="isPopupOpen"
    :formActionTitle="'Editar Usuário'"
    :data="userInPopup"
    :actions="actions"
    :togglePopup="() => (isPopupOpen = !isPopupOpen)"
  />
</template>
