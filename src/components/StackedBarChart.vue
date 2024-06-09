<template>
  <div class="conteiner">
    <div class="chart">
      <div
        v-for="(bar, i) in data"
        :key="i"
        class="bar-container"
        @mouseover="showTooltip(i, $event)"
        @mouseleave="hideTooltip"
      >
        <div class="bar-segment total-bar" :style="getTotalBarStyle(i)"></div>
        <div
          v-for="(segment, j) in bar.slice(1)"
          :key="j"
          class="bar-segment"
          :style="getBarStyle(i, j)"
        ></div>
      </div>
    </div>
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
    <div
      v-if="tooltip.visible"
      class="tooltip"
      :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }"
    >
      <div><strong>Parceiro:</strong> {{ itens[tooltip.index] }}</div>
      <div><strong>Total:</strong> {{ data[tooltip.index][0] }}</div>
      <div><strong>Associado:</strong> {{ data[tooltip.index][1] }}</div>
      <div><strong>Finalizado:</strong> {{ data[tooltip.index][2] }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  itens: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  scale: {
    type: Number,
    default: 20, // Ajuste o valor da escala conforme necessário
  },
});

const tooltip = ref({
  visible: false,
  index: 0,
  x: 0,
  y: 0,
});

const showTooltip = (index: number, event: MouseEvent) => {
  tooltip.value = {
    visible: true,
    index,
    x: 0, // Ajuste para considerar o scroll horizontal da página
    y: 5, // Ajuste para considerar o scroll vertical da página
  };
};

const hideTooltip = () => {
  tooltip.value.visible = false;
};

const getMaxHeight = () => {
  return Math.max(...props.data.map(bar => bar[0]));
};

const getTotalBarStyle = (barIndex: number) => {
  const totalHeight = getMaxHeight();
  const height = props.data[barIndex][0];
  return {
    height: `${(height / totalHeight) * 100}%`, // Proporcional à altura total
    backgroundColor: '#E0E0E0', // Cor da barra total
  };
};

const getBarStyle = (barIndex: number, segmentIndex: number) => {
  const heights = props.data[barIndex] as number[];
  const totalHeight = heights[0];
  const segmentHeight = heights[segmentIndex + 1]; // +1 porque a primeira posição é o valor total

  return {
    height: `${(segmentHeight / totalHeight) * 100}%`,
    backgroundColor: segmentIndex === 0 ? '#B46BC2' : '#94DF49', // Cores diferentes para cada segmento
  };
};
</script>

<style scoped>
.conteiner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px;
  background-color: #fff;
  position: relative;
  padding-left: 25px;
}

.bar-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 20px;
  height: 100%;
  margin: 0 10px;
  position: relative;
}

.chart {
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
  width: 100%;
  height: 100%;
}

.bar-segment {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.total-bar {
  position: relative;
}

.title {
  margin-top: 10px;
  font-size: 0.4rem;
}

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  pointer-events: none;
  z-index: 1;
}
</style>
