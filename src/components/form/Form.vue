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
        <label>{{ getDisplayName(key) }}</label>
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
        <div class="div-button">
          <button class="form-button" @click="actions[action](data)">
            {{ getDisplayName(action) }}
          </button>
        </div>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { getDisplayName } from '../../util/util';

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
      getDisplayName,
      getFormFieldInputType,
    };
  },
};
</script>

<style scoped>
* {
  width: 100%;
  padding: 0;
  margin: 0;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: right;
  gap: 20px;
}

.form-title {
  text-align: center;
}

.form-field-list {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.form-row {
  display: flex;
  flex-direction: row;
  align-items: left;
  padding: 5px;
  height: 100%;
}

.form-row label {
  text-align: left;
}

.form-button-list {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

input {
  border: 2px solid transparent;
  width: 100%;
  height: 100%;
  padding-left: 0.8em;
  outline: none;
  overflow: hidden;
  background-color: #f3f3f3;
  border-radius: 4px;
  transition: all 0.5s;
  text-align: center;
}

.div-button {
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: space-evenly;
  width: 100%;
  height: 25px;
}

button {
  width: 90%;
  height: 100%;
  background-color: #7ea774;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 80%;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
