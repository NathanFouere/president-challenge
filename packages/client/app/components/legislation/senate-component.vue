<script setup lang="ts">
import container from '../../../config/container';
import HalfCircle from '../common/charts/half-circle.vue';
import type { SenatePresenter } from '~/presenters/legislation/senate.presenter';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';

const senatePresenter = container.get<SenatePresenter>(COMMON_DEPENDANCY_TYPES.SenatePresenter);

onMounted(async () => {
  await senatePresenter.getSenate();
});
</script>

<template>
  <div>
    <UCard>
      <template #header>
        Senate
      </template>
      <USkeleton
        v-if="senatePresenter.senateStore.isGettingSenate"
        class="w-full h-64 "
      />
      <div
        v-else-if="senatePresenter.senateStore.hasSenate"
        class="flex flex-col items-center"
      >
        <half-circle
          :data="senatePresenter.senateStore.getSenate!.senateCompositionChartData"
        />
      </div>
    </UCard>
  </div>
</template>
