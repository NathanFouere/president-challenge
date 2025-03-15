<script setup lang="ts">
import { defineProps } from 'vue';
import { Line } from 'vue-chartjs';
import type { LineChartDataDTO } from '@president-challenge/shared/dist/chart/LineChartDataDTO';

const props = defineProps<{
  data: LineChartDataDTO;
}>();

const options = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      min: props.data.minY ? props.data.minY - 0.80 : undefined,
      max: props.data.maxY ? props.data.maxY + 0.80 : undefined,
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
