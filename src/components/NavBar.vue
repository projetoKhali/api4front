<script lang="ts">
import router from '../router'
</script>
<template>
  <nav>
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

.router-link {
  color: #FFCCFF;
  text-decoration: none;
}
</style>
