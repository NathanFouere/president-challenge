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
  <template
    v-if="politicalPartiesPresenter.politicalPartiesStore.isGettingPoliticalParties"
  >
    <USkeleton
      class="w-full h-28 mb-3"
    />
  </template>

  <div
    v-else
    class="flex justify-between flex-wrap"
  >
    <template
      v-for="(politicalParty) in politicalPartiesPresenter.politicalPartiesStore.getPoliticalParties"
      :key="politicalParty.id"
    >
      <political-party-component
        :minimal-political-party="politicalParty"
        class="mb-3"
      />
    </template>
  </div>
</template>
