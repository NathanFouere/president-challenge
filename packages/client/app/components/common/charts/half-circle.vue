<script setup lang="ts">
import { Doughnut } from 'vue-chartjs';
import type { ChartDataDTO } from '@shared/chart/ChartDataDTO';

defineProps<{
  data: ChartDataDTO;
}>();

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  rotation: -90,
  circumference: 180,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      fullSize: true,
      onClick: () => {},
    },
  },
});
</script>

<template>
  <Doughnut
    :data="data"
    :options="chartOptions"
  />
</template>
