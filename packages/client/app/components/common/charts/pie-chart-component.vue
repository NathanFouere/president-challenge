<script setup lang="ts">
import { defineProps } from 'vue';
import { Pie } from 'vue-chartjs';
import type { ChartDataDTO } from '@president-challenge/shared/dist/chart/ChartDataDTO';

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
  <div>
    <Pie
      :data="data"
      :options="options"
    />
  </div>
</template>
