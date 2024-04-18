<template>
  <div class="main"> 
    <div class="left">
      <div class="top">
        <StatCircle
          :percentage="calcularPorcentagemTotalFinalizadas(partner)"
        />
        <BarChart :chartData="formattedBarChartData" />
      </div>
      <div class="bottom">
        <PieChart :chartData="formattedPieChartData" />
      </div>
    </div>
    <div class="right">
      <ProgressBar :tracks="tracksData" />
    </div>
  </div>
  <!-- <div class="dashboard-container">
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
  </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getDataMocked } from '../service/PartnerService';
import { PartnerSchema } from '../schema/Partner';
import StatCircle from '../components/StatCircle.vue';
import BarChart from '../components/charts/BarChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import ProgressBar from '../components/ProgressBar.vue';

const partner = ref<PartnerSchema[]>([]);
const pieChartData = ref<{ [key: string]: number }>({});
const barChartData = ref<{ [key: string]: number }>({});
const formattedBarChartData = ref<{ [key: string]: number }>({});
const formattedPieChartData = ref<{ [key: string]: number }>({});
const tracksData = ref<{ [key: string]: { [key: string]: number } }>({});

onMounted(async () => {
  try {
    // const url = 'URL_DO_SEU_ENDPOINT_2';
    partner.value = await getDataMocked();
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

const calcularPorcentagemFinalizadas = (parceiroData: PartnerSchema[]) => {
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

const calcularPorcentagemTotalFinalizadas = (parceiroData: PartnerSchema[]) => {
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
  const porcentagemFormatada = parseFloat(porcentagem.toFixed(1));

  return porcentagemFormatada;
};

const calcularEstadoExpertises = (parceiroData: PartnerSchema[]) => {
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
          expertise.qualifier &&
          expertise.qualifier.length
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

const formatarTracksData = (parceiroData: PartnerSchema[]) => {
  const formattedData: { [key: string]: { [key: string]: number } } = {};

  parceiroData.forEach(parceiro => {
    parceiro.tracks.forEach(track => {
      const trackProgress: { [key: string]: number } = {};

      track.expertises.forEach(expertise => {
        const totalQualifiers = expertise.qualifier.length;
        const qualifiersConcluidos = expertise.qualifier.filter(
          qualifier => qualifier.endDate !== null,
        ).length;
        const progress =
          totalQualifiers > 0
            ? (qualifiersConcluidos / totalQualifiers) * 100
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

.statcircle-container,
.barchart-container {
}

.progressbar-container {
  flex: 0.7;
  height: 80px;
}
.main {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
}
.top {
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.right{
  width: 100%;
  height: 100%;
  align-items: center;
}
.left{
  width: 100%;
  height: 50%;
  gap: 20px;
}
.bottom{
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;

}

.piechart-container {
  flex: 1.4;
  padding-top: 20px;
}
</style>
