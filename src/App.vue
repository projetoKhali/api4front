<script setup lang="ts">
import Example from './views/Example.vue';
import NavBar from './components/NavBar.vue';
import './styles.css'
</script>

<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>
