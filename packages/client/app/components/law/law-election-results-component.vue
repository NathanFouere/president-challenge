<script setup lang="ts">
import type { VoteResultsDatas } from '@shared/legislature/law-dto';
import { getDateFromTurnNumber } from '@shared/utils/date-converter';
import BarCharComponent from '~/components/common/charts/bar-char-component.vue';

defineProps<{
  voteResultsDatas: VoteResultsDatas;
}>();
</script>

<template>
  <h1 class="text-center">
    Results in Parliament
  </h1>
  <bar-char-component
    class="h-28 w-full"
    :data="voteResultsDatas.votesInParliament"
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
    :data="voteResultsDatas.votesInSenate"
    stacked
    :display-legend="false"
  />
  <br>
  <p>Last vote was on <b>{{ getDateFromTurnNumber(voteResultsDatas.turnOfVotes) }} </b></p>
</template>
