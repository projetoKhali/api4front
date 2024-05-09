<template>
  <nav>
    <div :class="'oracle-logo'" />
    <ul>
      <li
        v-for="route in $router.options.routes.filter(route =>
          !route.name.includes('[hide]'),
        )"
        :key="route.path"
      >
        <router-link :to="route.path" :class="'router-link'">
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import router from '../router';
export default {
  router,
};
</script>

<style scoped>
* {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 20px;
}

nav {
  background-color: #361a4d;
  border-bottom: 4px solid #b782e3;
}

ul {
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
}

.oracle-logo {
  height: 20px;
  width: 32px;
  min-width: 32px;
  border: 6px solid #9f382a;
  border-radius: 16px;
  padding: 0;
}

.router-link {
  color: #ffccff;
  text-decoration: none;
}

.router-link-active {
  color: white;
  text-decoration: underline white 4px;
}
</style>
