<template>
  <div>
    <h1>Vue Pop Up</h1>
    <button @click="() => TogglePopup('buttonTrigger')">Open Popup</button>
    <Popup
      v-if="popupTriggers.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
    >
      <FormPopup
        :formActionTitle="'Título do Formulário'"
        :user="user"
        :actions="actions"
      ></FormPopup>
    </Popup>
  </div>
</template>

<script lang="ts">
import Popup from '../components/Popup.vue';
import FormPopup from '../components/form/FormPopup.vue';
import { ref } from 'vue';

const popupTriggers = ref({ buttomTrigger: false });

const TogglePopup = trigger => {
  popupTriggers.value[trigger] = !popupTriggers.value[trigger];
};

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  profile: 'Oracle',
};

const actions = {
  salvar: (data: User) => {
    console.log('Data submitted:', data);
    TogglePopup();
  },
};

export default {
  components: {
    FormPopup,
    Popup,
  },
  setup() {
    return {
      user,
      actions,
      TogglePopup,
      popupTriggers,
    };
  },
};
</script>

<style></style>
