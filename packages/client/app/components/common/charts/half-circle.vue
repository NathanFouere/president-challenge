<script setup lang="ts">
import type { ChartDataDTO } from '@shared/typeschart/ChartDataDTO';
import { Doughnut } from 'vue-chartjs';

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
