<template>
  <Filter :fields="fields" />
  <ul v-if="!!filteredData.length">
    <li class="data-item" v-for="(item, index) in filteredData" :key="index">
      <p>{{ item.name }}</p>
      <p>{{ item.age }}</p>
      <p>{{ item.birthday }}</p>
      <p>{{ item.isActive }}</p>
      <p>{{ item.profile }}</p>
    </li>
  </ul>
  <p v-else>No data found :/</p>
</template>

<script lang="ts">
import { ref } from 'vue';
import Filter, { FilterField } from '../components/Filter.vue';

const data = [
  {
    name: 'John Doe',
    age: 30,
    birthday: '1990-01-01',
    isActive: false,
    profile: 'PartnerAdmin',
  },
  {
    name: 'Jane Doe',
    age: 25,
    birthday: '1995-01-01',
    isActive: true,
    profile: 'Oracle',
  },
  {
    name: 'John Smith',
    age: 35,
    birthday: '1985-01-01',
    isActive: true,
    profile: 'PartnerAdmin',
  },
  {
    name: 'Jane Smith',
    age: 40,
    birthday: '1980-01-01',
    isActive: false,
    profile: 'Oracle',
  },
  {
    name: 'John Johnson',
    age: 45,
    birthday: '1975-01-01',
    isActive: false,
    profile: 'PartnerAdmin',
  },
  {
    name: 'Jane Johnson',
    age: 50,
    birthday: '1970-01-01',
    isActive: true,
    profile: 'Oracle',
  },
  {
    name: 'John Jackson',
    age: 55,
    birthday: '1965-01-01',
    isActive: true,
    profile: 'PartnerAdmin',
  },
  {
    name: 'Jane Jackson',
    age: 60,
    birthday: '1960-01-01',
    isActive: false,
    profile: 'Oracle',
  },
  {
    name: 'John James',
    age: 65,
    birthday: '1955-01-01',
    isActive: false,
    profile: 'PartnerAdmin',
  },
  {
    name: 'Jane James',
    age: 70,
    birthday: '1950-01-01',
    isActive: true,
    profile: 'Oracle',
  },
  {
    name: 'John Brown',
    age: 75,
    birthday: '1945-01-01',
    isActive: true,
    profile: 'PartnerAdmin',
  },
  {
    name: 'Jane Brown',
    age: 80,
    birthday: '1940-01-01',
    isActive: false,
    profile: 'Oracle',
  },
  {
    name: 'John White',
    age: 85,
    birthday: '1935-01-01',
    isActive: true,
    profile: 'PartnerAdmin',
  },
  {
    name: 'Jane White',
    age: 90,
    birthday: '1930-01-01',
    isActive: true,
    profile: 'Oracle',
  },
  {
    name: 'John Black',
    age: 95,
    birthday: '1925-01-01',
    isActive: true,
    profile: 'PartnerAdmin',
  },
  {
    name: 'Jane Black',
    age: 100,
    birthday: '1920-01-01',
    isActive: false,
    profile: 'Oracle',
  },
  {
    name: 'John Green',
    age: 105,
    birthday: '1915-01-01',
    isActive: false,
    profile: 'PartnerAdmin',
  },
];

const filteredData = ref([]);

const currentFilters = ref<{
  name: string | null;
  age: number | null;
  birthday: string | null;
  isActive: string | null;
  profile: string | null;
}>({
  name: '',
  age: null,
  birthday: null,
  isActive: true,
  profile: null,
});

const filterData = () => {
  filteredData.value = data.filter(item => {
    if (
      currentFilters.value.name &&
      !item.name.includes(currentFilters.value.name)
    ) {
      return false;
    }

    if (currentFilters.value.age && item.age !== currentFilters.value.age) {
      return false;
    }

    if (
      currentFilters.value.birthday &&
      item.birthday !== currentFilters.value.birthday
    ) {
      return false;
    }

    if (
      currentFilters.value.isActive !== null &&
      item.isActive !== currentFilters.value.isActive
    ) {
      return false;
    }

    if (
      currentFilters.value.profile !== null &&
      item.profile !== currentFilters.value.profile
    ) {
      return false;
    }

    return true;
  });
};

const fields: FilterField[] = [
  {
    title: 'Name',
    onChange: value => {
      currentFilters.value.name = value;
      filterData();
    },
    type: 'text',
    default: currentFilters.value.name,
  },
  {
    title: 'Age',
    onChange: value => {
      currentFilters.value.age = value;
      filterData();
    },
    type: 'number',
    default: currentFilters.value.age,
  },
  {
    title: 'Birthday',
    onChange: value => {
      currentFilters.value.birthday = value;
      filterData();
    },
    type: 'date',
    default: currentFilters.value.birthday,
  },
  {
    title: 'Is Active',
    onChange: value => {
      currentFilters.value.isActive = value;
      filterData();
    },
    type: 'checkbox',
    default: currentFilters.value.isActive,
  },
  {
    title: 'Profile Type',
    onChange: value => {
      currentFilters.value.profile = value;
      filterData();
    },
    dropdown: ['PartnerAdmin', 'Oracle'],
    default: currentFilters.value.profile,
  },
];

export default {
  components: {
    Filter,
  },
  setup() {
    filterData();
    return {
      fields,
      data,
      currentFilters,
      filteredData,
      filterData,
    };
  },
};
</script>

<style scoped>
* {
  text-align: center;
}

p {
  margin: 0.25em;
  padding: 0.25em;
  width: 100%;
}

.filter {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: start;
  align-content: start;
  gap: 1em;
}

.data-item {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;
  align-content: start;
  gap: 1em;
}
</style>
