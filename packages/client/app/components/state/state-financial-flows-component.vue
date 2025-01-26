<script setup lang="ts">
import type { FinancialFlowDatas } from '@shared/state/state-dto';
import { getDateFromTurnNumber } from '@shared/utils/date-converter';
import StateFinancialFlowComponent from '~/components/state/state-financial-flow-component.vue';

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
    <state-financial-flow-component
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
