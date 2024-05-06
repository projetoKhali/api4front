<template>
  <Form
    :title="formActionTitle"
    :data="data"
    :onChangeFunctions="formDataOnChange"
    :actions="actions"
  />
</template>

<script lang="ts">
import Form from './Form.vue';

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
    data: {
      type: Object,
      required: true,
    },
    hideFields: {
      type: Array,
      required: false,
      default: () => ['id'],
    },
  },

  components: {
    Form,
  },

  setup(props) {
    const formDataOnChange = Object.keys(props.data)
      .filter((key: string) => !props.hideFields.includes(key))
      .reduce((acc: Record<string, (object: Object) => void>, key: string) => {
        acc[key] = (object: Object, value: string) => {
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
