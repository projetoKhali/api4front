<template>
  <div>

    <!-- use `v-for` para efetuar um loop dentro do template -->
    <!--     `Object.keys(data)` retorna um array com os nomes de cada atributo do objeto `data` -->
    <div v-for="(key, index) in Object.keys(data)" :key="index">

      <!-- `key` é o nome do atributo -->
      <!--     chaves duplas `{{ }}` são usadas para inserir valores de variaveis dentro do template -->
      <label>{{ key }}</label>

      <!-- :type define o tipo do input -->
      <!--    nesse caso estamos chamando a função `getFormFieldInputType` que retorna o tipo do input baseado no valor do atributo -->
      <!--    mas também é possível usar `:type="typeof data[key]"` caso não seja necessário um tratamento especial (diferenciar apenas text e number por ex) -->
      <!--    ou `:type="data[key] instanceof Date ? 'date' : typeof data[key]"` para tratar o caso de ser uma data, etc -->
      <!-- :value define o valor que estará sendo exibido no input ao ser renderizado -->
      <!--    `data[key]` faz com que o valor seja puxado do atributo de nome `key` do objeto `data` -->
      <!-- @input é um evento que é disparado quando o valor do input é alterado, assim como o onChange do React -->
      <!--    `onChangeFunctions[key]` é um objeto que contém funções que são chamadas quando o valor do input é alterado -->
      <!--    $event.target.value é o valor que foi inserido no input -->
      <!--    ou seja, estamos chamando a função `onChangeFunctions[key]` passando o objeto `data` e o valor inserido no input -->
      <input
        :type="getFormFieldInputType(data, key)"
        :value="data[key]"
        @input="onChangeFunctions[key](data, $event.target.value)"
      >
    </div>
  </div>
</template>

<script lang="ts">
function getFormFieldInputType(data: Object, key: string): string {
  if (data[key] instanceof Date) {
    return 'date';
  }

  switch (typeof data[key]) {
    case 'boolean':
      return 'checkbox';
    default:
      return typeof data[key];
  }
}

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    onChangeFunctions: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      getFormFieldInputType,
    };
  },
}
</script>

<style scoped></style>
