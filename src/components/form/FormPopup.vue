<template>
  <Popup>
    <Form
      :title="formActionTitle"
      :data="data"
      :onChangeFunctions="formDataOnChange"
      :actions="actualActions"
    />
  </Popup>
</template>

<script lang="ts">
import Form from './Form.vue';
import Popup from '../Popup.vue';

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
    togglePopup: {
      type: Function,
      required: true,
    },
  },

  components: {
    Popup,
    Form,
  },

  setup(props) {
    if (!props.data) {
      throw new Error(
        'FormPopup Error: data parameter is required in order to populate the form',
      );
    }

    const formDataOnChange = Object.keys(props.data)
      .filter((key: string) => !props.hideFields.includes(key))
      .reduce((acc: Record<string, (object: Object) => void>, key: string) => {
        acc[key] = (object: Object, value: string) => {
          return (object[key] = value);
        };
        return acc;
      }, {});

    const internalActions = {
      ...props.actions,
      cancel: props.actions?.cancel || ((_: Object) => {}),
    };

    const actualActions = Object.keys(internalActions).reduce(
      (acc: Object, key: string) => {
        acc[key] = (data: Object) => {
          internalActions[key](data);
          props.togglePopup();
        };

        return acc;
      },
      {},
    );

    return {
      formDataOnChange,
      actualActions,
    };
  },
};
</script>
