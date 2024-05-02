<template>
  <Form
    :data="formData"
    :onChangeFunctions="formDataOnChange"
  />
</template>

<script lang="ts">
import Form from '../components/form/Form.vue';

type TestDataType = {
  name: string;
  age: number;
  favDate: Date;
  isAlive: boolean;
};

const formData: TestDataType = {
  name: 'John Doe',
  age: 57,
  favDate: new Date(),
  isAlive: true,
};

const formDataOnChange = {
  name: (object: TestDataType, value: string) => {
    console.log('Name changed to:', value);
    return object.name = value
  },
  age: (object: TestDataType, value: number) => {
    console.log('Age changed to:', value);
    return object.age = value
  },
  favDate: (object: TestDataType, value: Date) => {
    console.log('Fav date changed to:', value);
    return object.favDate = value
  },
  isAlive: (object: TestDataType, value: boolean) => {
    console.log('Is alive changed to:', value);
    return object.isAlive = value
  },
}

export default {
  components: {
    Form,
  },
  setup() {
    return {
      formData,
      formDataOnChange,
    };
  },
};
</script>
