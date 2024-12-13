<script setup lang="ts">
import container from '../../../config/container';
import type { PoliticalPartiesPresenter } from '../../presenters/political-party/political-parties.presenter';
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';

usePageTitle().setTitle('Political parties list');

const politicalPartiesPresenter = container.get<PoliticalPartiesPresenter>(COMMON_DEPENDANCY_TYPES.PoliticalPartiesPresenter);

onMounted(async () => {
  await politicalPartiesPresenter.getPoliticalParties();
});
</script>

<template>
  <div
    class="grid grid-cols-6 gap-4"
  >
    <political-party-component
      v-for="(politicalParty) in politicalPartiesPresenter.politicalPartiesStore.getPoliticalParties"
      :key="politicalParty.id"
      :minimal-political-party="politicalParty"
    />
  </div>
</template>
