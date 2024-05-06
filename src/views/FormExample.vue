<template>
  <div class="form-example">
    <FormPopup
      v-if="isPopupOpen"
      :formActionTitle="'Criar Usuário'"
      :data="user"
      :actions="actions"
      :togglePopup="() => (isPopupOpen = !isPopupOpen)"
    />
    <button
      class="open-form-button"
      v-else
      @click="() => (isPopupOpen = !isPopupOpen)"
    >
      Criar Usuário +
    </button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

import FormPopup from '../components/form/FormPopup.vue';
import User from '../schemas/User';

const isPopupOpen = ref(false);

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
      isPopupOpen,
    };
  },
};
</script>

<style>
.form-example {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.open-form-button {
  padding: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.open-form-button:hover {
  background-color: #43abff;
  box-shadow: 0 0 10px 0 #77ddff;
  transition:
    background-color 0.3s ease 0s,
    box-shadow 0.3s ease 0s;
}
</style>
