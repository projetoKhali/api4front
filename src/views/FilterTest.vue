<template>
  <Filter :fields="fields" />
</template>

<script lang="ts">
import Filter, { FilterField } from '../components/Filter.vue';

const fields: FilterField[] = [
  {
    title: 'Name',
    onChange: value => {
      console.log(value);
    },
    type: 'text',
  },
  {
    title: 'Age',
    onChange: value => {
      console.log(value);
    },
    type: 'number',
  },
  {
    title: 'Birthday',
    onChange: value => {
      console.log(value);
    },
    type: 'date',
  },
  {
    title: 'Is Active',
    onChange: value => {
      console.log(value);
    },
    type: 'checkbox',
  },
  {
    title: 'Profile Type',
    onChange: value => {
      console.log(value);
    },
    dropdown: [
      'PartnerAdmin',
      'Oracle',
    ]
  }
];

export default {
  components: {
    Filter,
  },
  setup() {
    return {
      fields,
    };
  },
};
</script>
