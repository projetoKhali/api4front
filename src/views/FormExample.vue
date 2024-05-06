<template>
  <FormPopup :formActionTitle="'Criar'" :user="user" :actions="actions" />
</template>

<script lang="ts">
import FormPopup from '../components/form/FormPopup.vue';
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
    FormPopup,
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
