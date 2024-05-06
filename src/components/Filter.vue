<template>
  <div class="filter">
    <div
      v-for="(field, index) in Object.keys(fields)"
      :key="index"
      class="filter-row"
    >
      <label>{{ fields[field].title }}</label>
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
