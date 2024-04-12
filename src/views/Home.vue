<template>
  <h1>Home</h1>
  <router-link :to="'/example'">
    <a>Go to <code>/example</code></a>
  </router-link>
</template>
<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
* {
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 0.5em;

}
a {
  align-items: baseline;
}
h1 {
  color: green;
}
</style>
