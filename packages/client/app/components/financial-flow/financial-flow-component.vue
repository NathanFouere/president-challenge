<script setup lang="ts">
import type { FinancialFlowDatas } from '@president-challenge/shared/dist/state/financial_flow_datas';
import PieChartComponent from '~/components/common/charts/pie-chart-component.vue';

defineProps<{
  financialFlowChartData: FinancialFlowDatas;
}>();
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <PieChartComponent
      :data="financialFlowChartData.positiveFinancialFlows"
    />
    <PieChartComponent
      :data="financialFlowChartData.negativeFinancialFlows"
    />
  </div>
</template>
