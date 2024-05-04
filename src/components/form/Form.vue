<template>
  <div class="form-container">
    <h1 v-if="title" class="form-title">{{ title }}</h1>
    <div v-if="data" class="form-field-list">
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
    <ul class="form-button-list" v-if="actions">
      <div
        v-for="(action, index) in Object.keys(actions)"
        :key="index"
        class="form-button-wrapper"
      >
        <button class="form-button" @click="actions[action](data)">
          {{ action }}
        </button>
      </div>
    </ul>
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
    actions: {
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

.form-field-list {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.form-row label {
  text-align: right;
}

.form-button-list {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
