<template>
  <div class="container">
    <StackedBarChart
      v-for="(trackName, trackIndex) in tracks"
      :title="trackName"
      :itens="itens"
      :data="data"
      :height="height"
    />
  </div>
</template>

<script lang="ts">
import StackedBarChart from '../StackedBarChart.vue';
import { PartnerMetrics } from '../../schemas/partner/PartnerMetrics';

// vai ser necessário processar os dados aqui pra cada gráfico
// baseado nas tracks passadas e nas métricas dos parceiros
//
// pra calcular as barras é necessário saber quais tracks o
// parceiro participa, esse dado não está presente no partnerMetrics
// então provavelmente vai ser necessário fazer os GETs aqui
//
// bom q como é um componente `aggregated`, faz mais sentido ele
// fazer uns gets, comparando com componentes normais, que só
// recebem os dados prontos para a renderização

export default {
  components: {
    StackedBarChart,
  },
  props: {
    tracks: {
      type: Array as () => Array<String>,
      required: true,
    },
    partnerMetrics: {
      type: Array as () => Array<Partner>,
      required: true,
    },
  },
};
</script>
