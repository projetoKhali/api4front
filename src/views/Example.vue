<template>
  <h1>Example</h1>
  <router-link :to="'/'">
    <a>Back to home</a>
  </router-link>
</template>
<script>
export default {
  name: 'Example',
};
</script>

<style scoped>
h1 {
  color: magenta;
}
</style>
