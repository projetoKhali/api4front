<template>
    <div class="dashboard-container">
      <div class="cards">
        <CountCard title="Total de parceiros" :number="150"/>
        <CountCard title="Total de expertises" :number="150"/>
        <CountCard title="Total de qualificadores" :number="150"/>
      </div>
      <div class="chart-wrapper">
        <PieChart :chartData="formattedPieChartData" />
      </div>
      <div> 
        <ProgressBar :tracks="tracksData" />
      </div>
      <div>
        <Table :head="tableHead" :body="tableBody" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import PieChart from '../components/charts/PieChart.vue';
  import CountCard from '../components/CountCard.vue';
  import ProgressBar from '../components/ProgressBar.vue';
  import Table from '../components/Table.vue';
  
  interface Qualifier {
    name: string;
    description: string;
    startDate: string;
    endDate: string | null;
  }
  
  interface Expertise {
    name: string;
    description: string;
    qualifiers: Qualifier[];
  }
  
  interface Partner {
  name: string;
  startDate: string;
  location: string;
  expertises: Expertise[];
  qualifiers: Qualifier[];
}

  interface Track {
    name: string;
    description: string;
    expertises: Expertise[];
  }
  
  interface ParceiroData {
    tracks: Track[];
    partners: Partner[];
  }
  
  const parceiros = ref<ParceiroData>({
    tracks: [],
    partners: [],
  });
  
  const pieChartData = ref<{
    [key: string]: number;
  }>({});
  
  const formattedPieChartData = ref<{
    [key: string]: number;
  }>({});

  const tracksData = {
  'Build': {
    'OCL': 20,
    'OGG': 40,
    'AAA': 10,
    'DEE': 50,
    'AAAa': 10
  }
};

const tableHead = ['Coluna 1', 'Coluna 2', 'Coluna 3'];
const tableBody = [
  ['Dado 1', 'Dado 2', 'Dado 3'],
  ['Dado 4', 'Dado 5', 'Dado 6'],
  ['Dado 7', 'Dado 8', 'Dado 9']
];
  
  const getParceiroData = async () => {
    try {
      const mockParceiroData: ParceiroData = {
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
                      endDate: null
                    },
                    {
                      name: "Qualifier2",
                      description: "Descrição do Qualificador2",
                      startDate: "2023-01-01",
                      endDate: null
                    },
                    {
                      name: "Qualifier3",
                      description: "Descrição do Qualificador3",
                      startDate: "2023-01-01",
                      endDate: null
                    }
                  ]
                },
                {
                  name: "Expertise2",
                  description: "Descrição da Expertise2",
                  startDate: "2023-01-01",
                  endDate: null,
                  qualifiers: []
                }
              ]
            }
          ],
          partners: [
            {
              name: "Parceiro1",
              startDate: "2023-01-01",
              location: "São Paulo",
              expertises: [
                {
                  name: "Expertise1",
                  description: "Descrição da Expertise1",
                  startDate: "2023-01-01",
                  endDate: null
                },
                {
                  name: "Expertise2",
                  description: "Descrição da Expertise2",
                  startDate: "2023-01-01",
                  endDate: "2023-02-28"
                }
              ],
              qualifiers: [
                {
                  name: "Qualifier1",
                  description: "Descrição do Qualificador1",
                  startDate: "2023-01-01",
                  endDate: null
                },
                {
                  name: "Qualifier2",
                  description: "Descrição do Qualificador2",
                  startDate: "2023-01-01",
                  endDate: null
                }
              ]
            },
            {
              name: "Parceiro2",
              startDate: "2023-02-01",
              location: "Rio de Janeiro",
              expertises: [
                {
                  name: "Expertise3",
                  description: "Descrição da Expertise3",
                  startDate: "2023-02-01",
                  endDate: null
                },
                {
                  name: "Expertise4",
                  description: "Descrição da Expertise4",
                  startDate: "2023-02-01",
                  endDate: "2023-03-15"
                }
              ],
              qualifiers: [
                {
                  name: "Qualifier3",
                  description: "Descrição do Qualificador3",
                  startDate: "2023-02-01",
                  endDate: null
                }
              ]
            }
          ]
        } as unknown as ParceiroData;
  
      return mockParceiroData;
    } catch (error) {
      console.error('Erro ao obter dados do parceiro:', error);
      throw error;
    }
  };
  
  onMounted(async () => {
    try {
      const parceiroData = await getParceiroData();
      console.log('Dados dos parceiros:', parceiroData);
  
      pieChartData.value = calcularEstadoExpertises(parceiroData);
      console.log('Dados do gráfico de pizza:', pieChartData.value);
  
      formattedPieChartData.value = pieChartData.value;
    } catch (error) {
      console.error('Erro ao carregar dados dos parceiros:', error);
    }
  });
  
  const calcularEstadoExpertises = (parceiroData: ParceiroData) => {
  const data: { [key: string]: number } = {
    "Finalizadas": 0,
    "Em progresso": 0,
    "Não iniciadas": 0,
  };

  const expertiseCount: { [key: string]: number } = {};

  parceiroData.tracks.forEach(track => {
    track.expertises.forEach(expertise => {
      const expertiseName = expertise.name;
      if (!expertiseCount[expertiseName]) {
        expertiseCount[expertiseName] = 0;
      }
      expertiseCount[expertiseName]++;
    });
  });

  parceiroData.partners.forEach(partner => {
    partner.expertises.forEach(expertise => {
      const expertiseName = expertise.name;
      if (expertiseCount[expertiseName]) {
        if (expertise.qualifiers && expertise.qualifiers.length > 0) {
          const hasFinishedQualifier = expertise.qualifiers.some(qualifier => qualifier.endDate !== null);
          if (hasFinishedQualifier) {
            data["Finalizadas"] += 1;
          } else {
            data["Em progresso"] += 1;
          }
        } else {
          data["Não iniciadas"] += 1;
        }
        delete expertiseCount[expertiseName];
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
  .cards {
   display: flex;
   gap: 10px;
  }
  </style>
