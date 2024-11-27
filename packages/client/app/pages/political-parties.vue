<script setup lang="ts">
import container from '../../config/container';
import type { PoliticalPartyPresenter } from '../presenters/political-party.presenter';
import { COMMON_DEPENDANCY_TYPES } from '../../config/common.types';

const politicalPartyPresenter = container.get<PoliticalPartyPresenter>(COMMON_DEPENDANCY_TYPES.PoliticalPartyPresenter);

onMounted(async () => {
  await politicalPartyPresenter.getPoliticalParties();
});
</script>

<template>
  <p>Political Parties</p>
  {{ politicalPartyPresenter.politicalPartyStore.getPoliticalParties }}
</template>

<style scoped>

</style>
