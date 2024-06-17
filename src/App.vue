<script setup lang="ts">
import NavBar from './components/nav/NavBar.vue';
import './styles.css';
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
