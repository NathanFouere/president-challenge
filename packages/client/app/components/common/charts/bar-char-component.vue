<script setup lang="ts">
import type { ChartDataDTO } from '@president-challenge/shared/dist/chart/ChartDataDTO';
import { Bar } from 'vue-chartjs';

const props = defineProps<{
  data: ChartDataDTO;
  stacked: boolean;
  displayLegend: boolean;
}>();

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: props.displayLegend,
      position: 'bottom',
      fullSize: true,
      onClick: () => {},
    },
  },
  scales: {
    x: {
      stacked: props.stacked,
    },
    y: {
      stacked: props.stacked,
    },
  },
});
</script>

<template>
  <div>
    <Bar
      :data="data"
      :options="chartOptions"
    />
  </div>
</template>
