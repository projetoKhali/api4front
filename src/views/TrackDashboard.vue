<template>
  <div class="dashboard-container">
    <div class="left-side">
      <div class="cards">
        <CountCard title="Total de parceiros" :number="totalParceiros" iconName="user" />
        <CountCard title="Total de expertises" :number="totalExpertises" iconName="trophy"/>
        <CountCard title="Total de qualificadores" :number="totalQualificadores" iconName="book-bookmark"/>
      </div>
        <div class="bottom"> 
          <div class="table-expertise">
            <h2>Tabela de Expertises</h2>
            <Table :head="tableHeadExpertises" :route="tableBodyExpertises" />
          </div>
          <div class="table-qualify">
            <h2>Tabela de Qualificadores</h2>
            <Table :head="tableHeadQualificadores" :body="tableBodyQualificadores" />
          </div>
        </div>
    </div>
    <div class="right-side">
      <div class="piechart-container">
        <PieChart :chartData="formattedPieChartData" />
      </div>
      <div class="progressbar-container">
        <ProgressBar :tracks="progressBarData" />
      </div>
    </div>
  </div>
  <div class="down-buttom"> </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PieChart from '../components/charts/PieChart.vue';
import CountCard from '../components/CountCard.vue';
import ProgressBar from '../components/ProgressBar.vue';
import Table from '../components/Table.vue';
import { getDataProduct } from '../service/TrackService';
import { TrackSchema } from '../schemas/track/Track';

const track = ref<TrackSchema[]>([]);
const progressBarData = ref<{ [key: string]: { [key: string]: number } }>({});
const formattedPieChartData = ref<{ [key: string]: number }>({});
const tableHeadExpertises = [
  'Expertise',
  'Número de Parceiros',
  'Tempo Médio de Conclusão',
];
const tableBodyExpertises = ref<Array<[string, string, string]>>([]);
const tableHeadQualificadores = [
  'Qualificador',
  'Número de Parceiros',
  'Tempo Médio de Conclusão',
];
const tableBodyQualificadores = ref<Array<[string, number, number]>>([]);
const totalParceiros = ref(0);
const totalExpertises = ref(0);
const totalQualificadores = ref(0);

onMounted(async () => {
  try {
    track.value = await getDataProduct('Track 1');
    console.log('Dados da track:', track.value);

    calcularPieChartData(track.value);
    preencherTabelaExpertises();
    preencherTabelaQualificadores();
    calcularProgressBarData();
    calcularTotais();
  } catch (error) {
    console.error('Erro ao carregar dados dos parceiros:', error);
  }
});

const calcularPieChartData = (track: TrackSchema[]) => {
  const data: { [key: string]: number } = {
    'Finalizadas': 0,
    'Em progresso': 0,
    'Não iniciadas': 0,
  };

  track.forEach(track => {
    track.partners.forEach(partner => {
      partner.expertises.forEach(expertise => {
        if (expertise.endDate !== null) {
          data['Finalizadas']++;
        } else if (expertise.startDate !== null) {
          data['Em progresso']++;
        } else {
          data['Não iniciadas']++;
        }
      });
    });
  });

  formattedPieChartData.value = data;
};

const preencherTabelaExpertises = () => {
  const dadosTabela: Array<[string, number, number]> = [];

  track.value.forEach((track: TrackSchema) => {
    track.partners.forEach(partner => {
      partner.expertises.forEach(expertise => {
        const index = dadosTabela.findIndex(item => item[0] === expertise.name);
        if (index === -1) {
          dadosTabela.push([
            expertise.name,
            1,
            calcularTempoMedioConclusaoExpertise(expertise.name),
          ]);
        } else {
          dadosTabela[index][1]++;
        }
      });
    });
  });

  tableBodyExpertises.value = dadosTabela;
};

const preencherTabelaQualificadores = () => {
  const dadosTabela: Array<[string, number, number]> = [];

  track.value.forEach(track => {
    track.partners.forEach(partner => {
      partner.qualifiers.forEach(qualifier => {
        const index = dadosTabela.findIndex(item => item[0] === qualifier.name);
        if (index === -1) {
          dadosTabela.push([
            qualifier.name,
            1,
            calcularTempoMedioConclusaoQualifier(qualifier.name),
          ]);
        } else {
          dadosTabela[index][1]++;
        }
      });
    });
  });

  tableBodyQualificadores.value = dadosTabela;
};

const calcularTempoMedioConclusaoExpertise = (
  expertiseName: string,
): number => {
  let totalTempo = 0;
  let count = 0;

  track.value.forEach(track => {
    track.partners.forEach(partner => {
      partner.expertises.forEach(expertise => {
        if (expertise.name === expertiseName && expertise.endDate !== null) {
          const diff =
            new Date(expertise.endDate).getTime() -
            new Date(expertise.startDate).getTime();
          totalTempo += diff;
          count++;
        }
      });
    });
  });

  const mediaEmMilissegundos = count > 0 ? totalTempo / count : 0;
  const mediaEmHoras = mediaEmMilissegundos / (1000 * 60 * 60);
  return mediaEmHoras;
};

const calcularTempoMedioConclusaoQualifier = (
  qualifierNamne: string,
): number => {
  let totalTempo = 0;
  let count = 0;

  track.value.forEach(track => {
    track.partners.forEach(partner => {
      partner.qualifiers.forEach(qualifiers => {
        if (qualifiers.name === qualifierNamne && qualifiers.endDate !== null) {
          const diff =
            new Date(qualifiers.endDate).getTime() -
            new Date(qualifiers.startDate).getTime();
          totalTempo += diff;
          count++;
        }
      });
    });
  });

  const mediaEmMilissegundos = count > 0 ? totalTempo / count : 0;
  const mediaEmHoras = mediaEmMilissegundos / (1000 * 60 * 60);

  return mediaEmHoras;
};

interface ExpertiseProgress {
  [key: string]: number;
}

const calcularProgressBarData = () => {
  track.value.forEach(trackItem => {
    const expertiseProgress: ExpertiseProgress = {};
    trackItem.expertises.forEach(expertise => {
      let totalParceirosExpertise = 0;
      let totalParceirosFinalizados = 0;
      trackItem.partners.forEach(partner => {
        if (partner.expertises.some(e => e.name === expertise.name)) {
          totalParceirosExpertise++;
          if (
            partner.expertises.find(e => e.name === expertise.name)?.endDate !==
            null
          ) {
            totalParceirosFinalizados++;
          }
        }
      });
      const progressoMedio =
        totalParceirosExpertise > 0
          ? (totalParceirosFinalizados / totalParceirosExpertise) * 100
          : 0;
      expertiseProgress[expertise.name] = progressoMedio;
    });
    progressBarData.value[trackItem.name] = expertiseProgress;
  });
};

const calcularTotais = () => {
  totalParceiros.value = track.value.reduce((total, trackItem) => {
    return total + trackItem.partners.length;
  }, 0);

  totalExpertises.value = track.value.reduce((total, trackItem) => {
    return total + trackItem.expertises.length;
  }, 0);

  const uniqueQualifiers = new Set<string>();

  track.value.forEach(trackItem => {
    trackItem.expertises.forEach(expertise => {
      expertise.qualifiers.forEach(qualifiers => {
        uniqueQualifiers.add(qualifiers.name);
      });
    });
  });

  totalQualificadores.value = uniqueQualifiers.size;
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  background-color: #EBF2E8;

}

.table-container {
  height: 5px;
}
.piechart-container {
  height: 48%;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}

.cards {
  display: flex;
  gap: 10px;
  height: 12%;
}

.chart-wrapper {
  display: flex;
  gap: 20px;
}

.left-side{
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  padding-top: 8px;
}

.right-side{
  height: 100%;
  width: 40%;
  padding-left: 20px;
  border-radius: 15px;
  padding-top: 8px;
}
.progressbar-container {
  height: 48%;
  width: 95%;
  padding: 5px;
  
}
h2{
  color: #222a49;
  text-align: left;
  font-size: 1.5vw;
  padding-top: 5px;
  
}
.down-buttom{
  height: 80px;
  background-color: #944237;

}

*{
 font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

</style>
