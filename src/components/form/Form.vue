<template>
  <div class="form-container">
    <h1 v-if="title" class="form-title">{{ title }}</h1>
    <div
      v-for="(key, index) in Object.keys(data).filter(
        key => key in onChangeFunctions,
      )"
      :key="index"
      class="form-row"
    >
      <label>{{ key }}</label>
      <input
        :type="getFormFieldInputType(data, key)"
        :value="data[key]"
        @input="onChangeFunctions[key](data, $event.target.value)"
      />
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
    title: {
      type: String,
      required: false,
    },
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
};
</script>

<style scoped>

.form-container {
  display: flex;
  flex-direction: column;
  gap: 0.125em;
}

.form-title {
  text-align: center;
}

.form-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 1rem;
  width: 100%;
}

.form-row * {
  width: 100%;
}

.form-row label {
  text-align: right;
}
</style>
