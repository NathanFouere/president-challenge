<script setup lang="ts">
import container from '../../../config/container';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { SectorsPresenter } from '~/presenters/sector/sectors.presenter';

const sectorsPresenter = container.get<SectorsPresenter>(COMMON_DEPENDANCY_TYPES.SectorsPresenter);
usePageTitle().setTitle('Sectors');

onMounted(async () => {
  await sectorsPresenter.getSectors();
});
</script>

<template>
  <div
    class="flex flex-nowrap justify-center gap-4"
  >
    <USkeleton
      v-if="sectorsPresenter.sectorsStore.isGettingSectors"
      class="w-full h-64 "
    />
    <sector-component
      v-for="(sector) in sectorsPresenter.sectorsStore.getSectors"
      v-else
      :key="sector.id"
      class="flex-1"
      :sector="sector"
    />
  </div>
</template>
