<script lang="ts">
import router from '../router'
</script>
<template>
  <nav>
    <div :class="'oracle-logo'" />
    <ul>
      <li v-for="route in $router.options.routes" :key="route.path">
        <router-link :to="route.path" :class="'router-link'">
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
* {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  background-color: #f0f0f0;
}

.oracle-logo {
  height: 20px;
  width: 32px;
  min-width: 32px;
  border: 6px solid #9F382A;
  border-radius: 16px;
  padding: 0;
}

.router-link {
  color: #FFCCFF;
  text-decoration: none;
}
</style>
