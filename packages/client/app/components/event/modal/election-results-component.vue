<script setup lang="ts">
import type { ElectionResultsDto } from '@president-challenge/shared/dist/event/election-results-dto';
import BarCharComponent from '~/components/common/charts/bar-char-component.vue';

defineProps<{
  electionResults: ElectionResultsDto;
}>();
</script>

<template>
  <bar-char-component
    :data="electionResults.chartData"
    stacked
    :display-legend="false"
  />
  <p>
    {{ electionResults.title }}
  </p>
  <p>
    {{ electionResults.description }}
  </p>
</template>
