<template>
  <UserForm :formActionTitle="'Criar'" :user="user" :actions="actions" />
</template>

<script lang="ts">
import UserForm from '../components/form/UserForm.vue';
import User from '../schemas/User';

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  profile: 'Oracle',
};

const actions = {
  cancel: (data: User) => {
    console.log('Data canceled:', data);
  },
  submit: (data: User) => {
    console.log('Data submitted:', data);
  },
};

export default {
  components: {
    UserForm,
  },
  setup() {
    return {
      user,
      actions,
    };
  },
};
</script>

<style></style>
