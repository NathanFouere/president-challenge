<script setup lang="ts">
import { defineProps } from 'vue';
import { Line } from 'vue-chartjs';
import type { ChartDataDTO } from '@shared/chart/ChartDataDTO';

const props = defineProps<{
  data: ChartDataDTO;
}>();

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: !!props.data.title,
      text: props.data.title,
    },
  },
};
</script>

<template>
  <Line
    :data="data"
    :options="options"
  />
</template>
