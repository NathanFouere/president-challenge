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
  scales: {
    y: {
      min: props.data.minY - 0.25,
      max: props.data.maxY + 0.25,
      beginAtZero: true,
      ticks: props.data.yLabels
        ? {
            callback: function (value: number) {
              return props.data.yLabels![value] || (Math.floor(value) === value ? value : '');
            },
          }
        : {},
    },
  },
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
