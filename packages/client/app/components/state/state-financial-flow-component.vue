<script setup lang="ts">
import type { FinancialFlowDatas } from '@shared/state/state-dto';
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
