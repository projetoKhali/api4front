<template>
  <svg class="stat-circle" width="150" viewBox="0 0 20 20">
    <circle class="bg" cx="10" cy="10" r="8" fill="none" stroke="#f1f1f1" stroke-width="2"></circle>
    <circle class="progress" cx="10" cy="10" r="8" :data-percentage="percentage" fill="none" stroke="#94DF49" stroke-width="2" stroke-dasharray="51 51" :stroke-dashoffset="-51 + (51 / 100) * percentage" stroke-linecap="round"></circle>
    <text x="50%" y="55%" style="font-size: 4px;">{{ percentage }}%</text>
    <text x="50%" y="70%" style="font-size: 2px;">  {{ additionalText }} Expertises </text>
  </svg>
</template>

<script>
export default {
  props: {
    percentage: Number,
    progressColor: {
      type: String,
      default: '#94DF49',
    },
    additionalText: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.stat-circle {
  text {
    font-size: 5px; 
    text-anchor: middle;
    fill: #555;
  }
  background-color: #fff;
  width: 200px; 
  height: 200px; 
  box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: border-color 0.3s, transform 0.3s;
}
</style>
