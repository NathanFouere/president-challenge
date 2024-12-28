<script setup lang="ts">
import container from '../../../config/container';
import HalfCircle from '../common/charts/half-circle.vue';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { ParliamentPresenter } from '~/presenters/legislation/parliament.presenter';

const parliamentPresenter = container.get<ParliamentPresenter>(COMMON_DEPENDANCY_TYPES.ParliamentPresenter);

onMounted(async () => {
  await parliamentPresenter.getParliament();
});
</script>

<template>
  <div>
    <UCard>
      <template #header>
        Parliament
      </template>
      <USkeleton
        v-if="parliamentPresenter.parliamentStore.isGettingParliament"
        class="w-full h-64 "
      />
      <div
        v-else-if="parliamentPresenter.parliamentStore.hasParliament"
        class="flex flex-col items-center"
      >
        <half-circle
          :data="parliamentPresenter.parliamentStore.getParliament!.parliamentCompositionChartData"
        />
      </div>
    </UCard>
  </div>
</template>
