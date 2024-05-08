<template>
  <div class="filter">
    <div
      v-for="(field, index) in Object.values(fields)"
      class="filter-field"
      :key="index"
    >
      <label>{{ field.title }}</label>
      <input
        v-if="field.type"
        :type="field.type"
        @input="field.onChange($event.target.value)"
      />
      <select
        v-else-if="field.dropdown"
        @change="field.onChange($event.target.value)"
        >
          <option
            v-for="(option, optionIndex) in [null, ...field.dropdown]"
            :key="optionIndex"
            :value="field.dropdown"
            >{{option || "Selecione"}}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
export type FilterField = {
  title: string;
  onChange: (value: string) => void;
} & (
  | {
      dropdown: string[];
    }
  | {
      type: 'text' | 'number' | 'date' | 'checkbox';
    }
);

export default {
  props: {
    fields: {
      type: Array as () => FilterField[],
      required: true,
    },
  },
};
</script>

<style scoped>
.filter-field {
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.25em;
}
</style>
