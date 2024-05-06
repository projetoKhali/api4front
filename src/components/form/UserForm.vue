<template>
  <Form
    :title="formActionTitle + ' Usuário'"
    :data="user"
    :onChangeFunctions="formDataOnChange"
    :actions="actions"
  />
</template>

<script lang="ts">
import Form from './Form.vue';
import User from '../../schemas/User';

export default {
  props: {
    formActionTitle: {
      type: String,
      required: true,
    },
    actions: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  components: {
    Form,
  },

  setup(props) {
    const formDataOnChange = Object.keys(props.user)
    .filter((key: string) => key !== 'id')
    .reduce((acc: Record<string, (object: User) => void>, key: string) => {
      acc[key] = (object: User, value: string) => {
        return (object[key] = value);
      };
      return acc;
    }, {});

    return {
      formDataOnChange,
    };
  },
};
</script>
