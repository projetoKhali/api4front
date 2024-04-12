<script setup lang="ts">
import Example from './views/Example.vue';
</script>

<template>
  <router-view />
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
