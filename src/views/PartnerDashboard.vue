<template>
  <div class="dashboard-container">
    <div> 
      <StatCircle :percentage="calcularPorcentagemTotalFinalizadas(parceiros)" />
    </div>
    <div class="chart-wrapper">
      <BarChart :chartData="formattedBarChartData" />
    </div>
    <div>
      <ProgressBar :tracks="tracksData" />
    </div>
    <div class="chart-wrapper">
      <PieChart :chartData="formattedPieChartData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StatCircle from '../components/StatCircle.vue';
import BarChart from '../components/charts/BarChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import ProgressBar from '../components/ProgressBar.vue';


interface Expertise {
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  qualifiers: {
    name: string;
    description: string;
    startDate: string;
    endDate: string | null;
  }[];
}

interface Track {
  name: string;
  description: string;
  expertises: Expertise[];
}

interface ParceiroData {
  partner: string;
  location: string;
  tracks: Track[];
}

const parceiros = ref<ParceiroData>({
  partner: '',
  location: '',
  tracks: [],
});

const pieChartData = ref<{
  [key: string]: number;
}>({});

const barChartData = ref<{
  [key: string]: number;
}>({});

const formattedBarChartData = ref<{
  [key: string]: number;
}>({});

const formattedPieChartData = ref<{
  [key: string]: number;
}>({});

const tracksData = {
  'Build': {
    'OCL': 20,
    'OGG': 40
  },
  'Cloud': {
    'AAA': 10,
    'DEE': 50
  },
  'Clouda': {
    'AAAa': 10,
    'DEEa': 50
  }
};

const getParceiroData = async () => {
  try {
    const mockParceiroData = {
      partner: "Parceiro1",
      location: "São Paulo",
      tracks: [
        {
          name: "Track1",
          description: "Descrição da Track1",
          expertises: [
            {
              name: "Expertise1",
              description: "Descrição da Expertise1",
              startDate: "2023-01-01",
              endDate: null,
              qualifiers: [
                {
                  name: "Qualifier1",
                  description: "Descrição do Qualificador1",
                  startDate: "2023-01-01",
                  endDate: null,
                },
                {
                  name: "Qualifier2",
                  description: "Descrição do Qualificador1",
                  startDate: "2023-01-01",
                  endDate: null,
                },
                {
                  name: "Qualifier3",
                  description: "Descrição do Qualificador1",
                  startDate: "2023-01-01",
                  endDate: null,
                },
              ],
            },
            {
              name: "Expertise2",
              description: "Descrição da Expertise2",
              startDate: "2023-01-01",
              endDate: null,
              qualifiers: [
                {
                  name: "Qualifier4",
                  description: "Descrição do Qualificador1",
                  startDate: "2023-01-01",
                  endDate: "2023-01-15",
                },
                {
                  name: "Qualifier5",
                  description: "Descrição do Qualificador1",
                  startDate: "2023-01-01",
                  endDate: null,
                },
              ],
            },
          ],
        },
        {
          name: "Track2",
          description: "Descrição da Track2",
          expertises: [
            {
              name: "Expertise3",
              description: "Descrição da Expertise3",
              startDate: "2023-01-01",
              endDate: "2023-04-25",
              qualifiers: [
                {
                  name: "Qualifier6",
                  description: "Descrição do Qualificador1",
                  startDate: "2023-01-01",
                  endDate: "2023-02-20",
                },
                {
                  name: "Qualifier7",
                  description: "Descrição do Qualificador1",
                  startDate: "2023-01-01",
                  endDate: "2023-03-10",
                },
                {
                  name: "Qualifier8",
                  description: "Descrição do Qualificador1",
                  startDate: "2023-01-01",
                  endDate: "2023-03-10",
                },
              ],
            },
          ],
        },
      ],
    };

    return mockParceiroData;
  } catch (error) {
    console.error('Erro ao obter dados do parceiro:', error);
    throw error;
  }
};

onMounted(async () => {
  try {
    parceiros.value = await getParceiroData();
    console.log('Dados dos parceiros:', parceiros.value);

    barChartData.value = calcularPorcentagemFinalizadas(parceiros.value);
    console.log('Dados do gráfico de barras:', barChartData.value);

    pieChartData.value = calcularEstadoExpertises(parceiros.value);
    console.log('Dados do gráfico de pizza:', pieChartData.value);

    formattedBarChartData.value = barChartData.value;
    formattedPieChartData.value = pieChartData.value;
  } catch (error) {
    console.error('Erro ao carregar dados dos parceiros:', error);
  }
});

const calcularPorcentagemFinalizadas = (parceiroData: ParceiroData) => {
  const data: { [key: string]: number } = {};

  parceiroData.tracks.forEach(track => {
    const expertisesFinalizadas = track.expertises.filter(expertise => expertise.endDate !== null).length;
    const totalExpertises = track.expertises.length;
    const porcentagem = (expertisesFinalizadas / totalExpertises) * 100 || 0;
    data[track.name] = porcentagem;
  });

  return data;
};

const calcularPorcentagemTotalFinalizadas = (parceiro: ParceiroData) => {
  let totalTracks = 1;
  let tracksComEndDate = 0;

  if (parceiro && parceiro.tracks) {
    totalTracks = parceiro.tracks.length;

    parceiro.tracks.forEach(track => {
      if (track.expertises.some(expertise => expertise.endDate !== null)) {
        tracksComEndDate++;
      }
    });
  }

  const porcentagem = totalTracks > 0 ? (tracksComEndDate / totalTracks) * 100 : 0;
  console.log('Porcentagem de tracks com endDate:', porcentagem);

  return porcentagem;
};

const calcularEstadoExpertises = (parceiroData: ParceiroData) => {
  const data: { [key: string]: number } = {
    "Finalizados": 0,
    "Em progresso": 0,
    "Não iniciou": 0,
  };

  parceiroData.tracks.forEach(track => {
    track.expertises.forEach(expertise => {
      if (expertise.endDate) {
        data["Finalizados"]++;
      } else if (expertise.qualifiers && expertise.qualifiers.some(qualifier => qualifier.endDate)) {
        data["Em progresso"]++;
      } else {
        data["Não iniciou"]++;
      }
    });
  });

  return data;
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.chart-wrapper {
  flex: 1;
}
</style>
