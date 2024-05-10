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
        :value="field.default"
        :checked="field.default"
        @input="onChange(field.onChange, field, $event.target)"
      />
      <select
        v-else-if="field.dropdown"
        :value="field.default"
        @change="onChange(field.onChange, field, $event.target)"
      >
        <option
          v-for="(option, optionIndex) in [null, ...field.dropdown]"
          :key="optionIndex"
          :value="option"
        >
          {{ option || null }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
export type FilterField = {
  title: string;
  onChange: (value: string) => void;
  default?: string;
} & (
  | {
      dropdown: string[];
    }
  | {
      type: 'text' | 'number' | 'date' | 'checkbox';
    }
);

function onChange(
  callback: (value: string) => void,
  field: FilterField,
  target: HTMLInputElement | HTMLSelectElement,
) {
  switch (field.type) {
    case 'checkbox':
      return callback((target as HTMLInputElement)?.checked || null);
    case 'number':
      return callback(parseInt(target?.value) || null);
    default:
      return callback(target?.value || null);
  }
}

export default {
  methods: {
    onChange,
  },
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
