<template>
  <div class="filter">
    <div
      v-for="(field, index) in Object.values(fields)"
      class="filter-field"
      :key="index"
    >
      <label v-if="field.title">{{ field.title }}</label>
      <input
        v-if="field.type"
        :type="field.type"
        :value="field.default"
        :checked="field.default"
        :placeholder="field.placeholder"
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
      <p v-else :style="{ 'color': 'red', 'font-weight': 'bold' }">
        Tipo de filto desconhecido
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export type FilterField = {
  onChange: (value: string) => void;
  title?: string;
  default?: string;
} & (
  | {
      dropdown: string[];
    }
  | {
      type: 'number' | 'date' | 'checkbox';
    }
  | {
      type: 'text';
      placeholder?: string;
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
