<template>
  <div class="container">
    <div class="top">
      <Filter :fields="searchFields" />
      <Table
        ref="partnerSearchTableRef"
        :headers="partnerOptionsTableHeaders"
        :pagination="partnerOptionsPagination"
      />
    </div>
    <div class="middle">
      <StackedBarChartByTracks
        :tracks="tracks"
        :partnerMetrics="partnerMetricsSelected"
      />
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import StackedBarChartByTracks from '../components/aggregated/StackedBarChartByTracks.vue';
import Table, { CheckboxTableCell } from '../components/Table.vue';
import Filter, { FilterField } from '../components/Filter.vue';
import { PartnerMetricsSchema } from '../schemas/partner/PartnerMetrics';
import { getListPartnerMetrics } from '../service/PartnerMetricsService';
import { getTracks } from '../service/TrackService';
import { TrackSchema } from '../schemas/Track';

type PartnerMetricsComparative = {
  hideId: number;
  selected: boolean;
} & Omit<PartnerMetricsSchema, 'id'>;

const partnerSearchTableRef = ref<Table>();

const partnerOptionsTotalPages = ref(0);
const itemsPerPage: number = 5;

const currentPartnerSearch = ref<string>('');
const partnerOptions = ref<PartnerMetricsComparative>([]);

const tracks = ref<TrackSchema[]>([]);

const partnerMetricsSelected = ref<PartnerMetricsComparative[]>([]);

const isPartnerMetricsSelected = (
  partnerMetricsRow: PartnerMetricsComparative,
) => partnerMetricsSelected?.value.some(selectedPartnerMetrics => {
  console.log('partnerMetricsRow?.hideId == selectedPartnerMetrics?.hideId:', partnerMetricsRow?.hideId == selectedPartnerMetrics?.hideId);
  return partnerMetricsRow?.hideId == selectedPartnerMetrics?.hideId || false;
});

const togglePartnerMetricsSelected = (
  partnerMetricsRow: PartnerMetricsComparative,
) => {
  if (isPartnerMetricsSelected(partnerMetricsRow)) {
    partnerMetricsSelected.value = partnerMetricsSelected.value.filter(
      selectedPartnerMetrics =>
        selectedPartnerMetrics.hideId !== partnerMetricsRow.hideId,
    );
  } else {
    partnerMetricsSelected.value = [
      ...partnerMetricsSelected.value,
      partnerMetricsRow,
    ];
  }
};

const partnerOptionsTableHeaders = [
  'Selecionar',
  'Nome',
  'Cidade',
  'Tracks',
  'Tracks Concluídas',
  'Qualificadores',
  'Qualificadores Concluídos',
];

const requestPartners = async pageIndex => {
  const partnerMetricsPage = await getListPartnerMetrics(
    currentPartnerSearch.value,
    pageIndex,
    itemsPerPage,
  );

  partnerOptionsTotalPages.value = partnerMetricsPage.totalPages;

  partnerOptions.value = partnerMetricsPage.content
    .map((partnerMetrics: PartnerMetricsSchema) => ({
      hideId: partnerMetrics.id,
      selected: new CheckboxTableCell(
        isPartnerMetricsSelected(partnerMetrics),
        partnerMetricRowInTable => {
          togglePartnerMetricsSelected(partnerMetricRowInTable);
          console.log(
            'partnerMetricRowInTable selected:',
            partnerMetricRowInTable,
            '\npartnerMetricsSelected:',
            partnerMetricsSelected,
          );
        },
      ),
      name: partnerMetrics.name,
      city: partnerMetrics.city,
      tracks: partnerMetrics.tracks,
      completedTracks: partnerMetrics.completedTracks,
      qualifiers: partnerMetrics.qualifiers,
      completedQualifiers: partnerMetrics.completedQualifiers,
    }))
    .sort(
      (a: PartnerMetricsComparative, b: PartnerMetricsComparative) =>
        isPartnerMetricsSelected(a) - isPartnerMetricsSelected(b),
    );

  return partnerOptions.value;
};

const searchFields: FilterField[] = [
  {
    placeholder: 'Pesquise um parceiro',
    type: 'text',
    onChange: (value) => {
      currentPartnerSearch.value = value || '';
      requestPartners(0).then(updatedPartnerOptions => {
        partnerSearchTableRef.value?.manualRefresh(updatedPartnerOptions);
      });
    },
  },
];

const partnerOptionsPagination = {
  getTotalPages: (): number => partnerOptionsTotalPages.value,
  getPageData: async (pageIndex: number): PartnerMetricsComparative[] =>
    await requestPartners(pageIndex),
};

export default {
  components: {
    StackedBarChartByTracks,
    Filter,
    Table,
  },
  setup() {
    getTracks().then(tracks => {
      tracks.value = tracks;
    });

    return {
      partnerSearchTableRef,
      partnerMetricsSelected,
      partnerOptionsTableHeaders,
      partnerOptionsTotalPages,
      partnerOptionsPagination,
      currentPartnerSearch,
      partnerOptions,
      searchFields,
      tracks,
    };
  },
};
</script>

<style>
.data-item-field {
  display: inline-block;
  margin-right: 10px;
}
</style>
