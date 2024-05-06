<template>
  <div class="dashboard-container">
    <div class="chart-container">
      <div class="statcircle-container">
        <StatCircle
          :percentage="calcularPorcentagemTotalFinalizadas(partner)"
        />
      </div>
      <div class="barchart-container">
        <BarChart :chartData="formattedBarChartData" />
      </div>
    </div>
    <div class="progressbar-container">
      <ProgressBar :tracks="tracksData" />
    </div>
    <div class="piechart-container">
      <PieChart :chartData="formattedPieChartData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getDashboardData } from '../service/PartnerService';
import { PartnerSchemaDashboard } from '../schemas/partner/Partner';
import StatCircle from '../components/StatCircle.vue';
import BarChart from '../components/charts/BarChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import ProgressBar from '../components/ProgressBar.vue';
import { useRoute } from 'vue-router';

const partner = ref<PartnerSchemaDashboard[]>([]);
const pieChartData = ref<{ [key: string]: number }>({});
const barChartData = ref<{ [key: string]: number }>({});
const formattedBarChartData = ref<{ [key: string]: number }>({});
const formattedPieChartData = ref<{ [key: string]: number }>({});
const tracksData = ref<{ [key: string]: { [key: string]: number } }>({});
const route = useRoute();

onMounted(async () => {
  try {
    const partnerId = Number(route.params.partnerId);
    partner.value = await getDashboardData(partnerId);
    console.log('Dados dos partner:', partner.value);

    barChartData.value = calcularPorcentagemFinalizadas(partner.value);
    console.log('Dados do gráfico de barras:', barChartData.value);

    pieChartData.value = calcularEstadoExpertises(partner.value);
    console.log('Dados do gráfico de pizza:', pieChartData.value);

    formattedBarChartData.value = barChartData.value;
    formattedPieChartData.value = pieChartData.value;
    formatarTracksData(partner.value);
  } catch (error) {
    console.error('Erro ao carregar dados dos partner:', error);
  }
});

const calcularPorcentagemFinalizadas = (
  parceiroData: PartnerSchemaDashboard[],
) => {
  const data: { [key: string]: number } = {};

  parceiroData.forEach(parceiro => {
    parceiro.tracks.forEach(track => {
      const expertisesFinalizadas = track.expertises.filter(
        expertise => expertise.endDate !== null,
      ).length;
      const totalExpertises = track.expertises.length;
      const porcentagem = (expertisesFinalizadas / totalExpertises) * 100 || 0;
      data[track.name] = porcentagem;
    });
  });

  return data;
};

const calcularPorcentagemTotalFinalizadas = (
  parceiroData: PartnerSchemaDashboard[],
) => {
  let totalExpertises = 0;
  let expertisesFinalizadas = 0;

  parceiroData.forEach(parceiro => {
    parceiro.tracks.forEach(track => {
      track.expertises.forEach(expertise => {
        totalExpertises++;
        if (expertise.endDate) {
          expertisesFinalizadas++;
        }
      });
    });
  });

  const porcentagem =
    totalExpertises > 0 ? (expertisesFinalizadas / totalExpertises) * 100 : 0;
  console.log('Porcentagem de expertises concluídas:', porcentagem);

  return porcentagem;
};

const calcularEstadoExpertises = (parceiroData: PartnerSchemaDashboard[]) => {
  const data: { [key: string]: number } = {
    'Finalizados': 0,
    'Em progresso': 0,
    'Não iniciou': 0,
  };

  parceiroData.forEach(parceiro => {
    parceiro.tracks.forEach(track => {
      track.expertises.forEach(expertise => {
        if (expertise.endDate) {
          data['Finalizados']++;
        } else if (
          expertise.qualifiers &&
          expertise.qualifiers.some(qualifiers => qualifiers.endDate)
        ) {
          data['Em progresso']++;
        } else {
          data['Não iniciou']++;
        }
      });
    });
  });

  return data;
};

const formatarTracksData = (parceiroData: PartnerSchemaDashboard[]) => {
  const formattedData: { [key: string]: { [key: string]: number } } = {};

  parceiroData.forEach(parceiro => {
    parceiro.tracks.forEach(track => {
      const trackProgress: { [key: string]: number } = {};

      track.expertises.forEach(expertise => {
        const totalqualifiers = expertise.qualifiers.length;
        const qualifiersConcluidos = expertise.qualifiers.filter(
          qualifiers => qualifiers.endDate !== null,
        ).length;
        const progress =
          totalqualifiers > 0
            ? (qualifiersConcluidos / totalqualifiers) * 100
            : 0;
        trackProgress[expertise.name] = progress;
      });

      formattedData[track.name] = trackProgress;
    });
  });

  tracksData.value = formattedData;
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-wrap: wrap;
}

.chart-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.progressbar-container {
  flex: 0.7;
  height: 80px;
}

.piechart-container {
  flex: 1.4;
  padding-top: 20px;
}
</style>
