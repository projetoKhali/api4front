<template>
  <div>
    <div v-for="(key, index) in Object.keys(data)" :key="index">
      <label>{{ key }}</label>
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
