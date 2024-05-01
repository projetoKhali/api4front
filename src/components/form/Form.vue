<template>
  <div>
    <div v-for="(key, index) in Object.keys(data)" :key="index">
      <label>{{ key }}</label>
      <input
        :type="utils.data[key] instanceof Date ? 'date' : typeof data[key]"
        :value="data[key]"
        @input="onChangeFunctions[key](data, $event.target.value)"
      >
    </div>
  </div>
</template>

<script lang="ts">
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
  }
}
</script>

<style scoped></style>
