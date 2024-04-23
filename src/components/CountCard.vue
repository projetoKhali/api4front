<script setup lang="ts">

const props = defineProps({
  title: String,
  number: Number,
});
</script>

<template>
  <div class="count-card">
    <h3 class="title-card">{{ title }}</h3>
    <h1 class="number-card">{{ number }}</h1>
  </div>
</template>

<style scoped>
.count-card {
  display: flex;
  flex-direction: column;
  gap: 7;

  width: 100%;
  height: 100%;
  border-radius: 9px;

  background-color: #ffffff;
  box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.1);
  border: 3px solid transparent;
  transition:
    border-color 0.3s,
    transform 0.3s;
}

.count-card:hover {
  transform: scale(1.05);
}

.title-card {
  margin: 22px 0 0 0;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  vertical-align: top;
  font-optical-sizing: auto;
  font-weight: 400;
  text-align: center;
  font-variation-settings: 'slnt' 0;
  color: #000;
}

.number-card {
  margin: 0px 0px 26px 0px;
  vertical-align: top;
  font-size: 25px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-variation-settings: 'slnt' 0;
  color: #000;
}
</style>
