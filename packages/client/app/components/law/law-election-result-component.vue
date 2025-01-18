<script setup lang="ts">
import type { VoteResultsData } from '@shared/legislature/law-dto';
import { getDateFromTurnNumber } from '@shared/utils/date-converter';
import BarCharComponent from '~/components/common/charts/bar-char-component.vue';

defineProps<{
  voteResultDatas: VoteResultsData;
}>();
</script>

<template>
  <h1 class="text-center">
    Results in Parliament
  </h1>
  <bar-char-component
    class="h-28 w-full"
    :data="voteResultDatas.votesInParliament"
    stacked
    :display-legend="false"
  />
  <br>
  <UDivider />
  <br>
  <h1 class="text-center">
    Results in Senate
  </h1>
  <bar-char-component
    class="h-28 w-full"
    :data="voteResultDatas.votesInSenate"
    stacked
    :display-legend="false"
  />
  <br>
  <p>Vote was on <b>{{ getDateFromTurnNumber(voteResultDatas.turnOfVotes) }}</b> and law <b>{{ voteResultDatas.votePassed ? 'passed': 'didn\'t pass' }}</b></p>
</template>
