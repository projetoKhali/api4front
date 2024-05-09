<template>
  <svg class="stat-circle" width="100%" height="100%" viewBox="0 0 20 20">
    <circle
      class="bg"
      cx="10"
      cy="10"
      r="8"
      fill="none"
      stroke="#f1f1f1"
      stroke-width="2"
    />
    <circle
      class="progress"
      cx="10"
      cy="10"
      r="8"
      :data-percentage="percentage"
      fill="none"
      stroke="#7EA774"
      stroke-width="2"
      :stroke-dasharray="`${dashArray} ${dashArray}`"
      :stroke-dashoffset="dashOffset"
      stroke-linecap="round"
    />
    <text x="50%" y="55%" style="font-size: 4px">{{ percentage.toFixed(1) }}%</text>
    <text x="50%" y="70%" style="font-size: 2px">
      {{ additionalText }} Expertises
    </text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
  progressColor: {
    type: String,
    default: '#94DF49',
  },
  additionalText: {
    type: String,
    default: '',
  },
});

const dashArray = computed(() => 51);
const dashOffset = computed(
  () => -dashArray.value + (dashArray.value / 100) * props.percentage,
);
</script>

<style scoped>
.stat-circle {
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
  height: 100%;
  transition:
    border-color 0.3s,
    transform 0.3s;
}

.stat-circle > text {
  font-size: 5px;
  text-anchor: middle;
  fill: #555;
}

</style>
