<script setup lang="ts">
import type { VoteResultsData } from '@shared/legislature/law-dto';

const props = defineProps<{
  voteResultsDatas: VoteResultsData[];
}>();

const voteResultIndex = ref(props.voteResultsDatas.length - 1);
const voteResultsSelected = computed(() => props.voteResultsDatas[voteResultIndex.value]);
</script>

<template>
  <law-election-result-component
    v-if="voteResultsSelected"
    :vote-result-datas="voteResultsSelected"
  />
  <div class="flex justify-between p-10 ">
    <UButton
      label="Previous"
      :disabled="voteResultIndex === 0"
      @click="voteResultIndex = Math.max(0, voteResultIndex - 1)"
    />
    <UButton
      label="Next"
      :disabled="voteResultIndex === voteResultsDatas.length - 1"
      @click="voteResultIndex = Math.min(voteResultsDatas.length - 1, voteResultIndex + 1)"
    />
  </div>
</template>
