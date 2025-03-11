<script setup lang="ts">
import { getDateFromTurnNumber } from '@president-challenge/shared/dist/utils/date-converter';
import type { FinancialFlowDatas } from '@president-challenge/shared/dist/state/financial_flow_datas';

const props = defineProps<{
  financialFlowsChartDatas: FinancialFlowDatas[];
}>();

const financialFlowChartIndex = ref(props.financialFlowsChartDatas.length - 1);
const financialFlowChartSelected = computed(() => props.financialFlowsChartDatas[financialFlowChartIndex.value]);
</script>

<template>
  <UCard
    v-if="financialFlowChartSelected"
  >
    <template
      #header
    >
      <h1>Expenses and revenues of {{ getDateFromTurnNumber(financialFlowChartSelected.turn) }}</h1>
    </template>
    <financial-flow-component
      :financial-flow-chart-data="financialFlowChartSelected"
    />
    <div class="flex justify-between p-10 ">
      <UButton
        label="Previous"
        :disabled="financialFlowChartIndex === 0"
        @click="financialFlowChartIndex = Math.max(0, financialFlowChartIndex - 1)"
      />
      <UButton
        label="Next"
        :disabled="financialFlowChartIndex === financialFlowsChartDatas.length - 1"
        @click="financialFlowChartIndex = Math.min(financialFlowsChartDatas.length - 1, financialFlowChartIndex + 1)"
      />
    </div>
  </UCard>
</template>
