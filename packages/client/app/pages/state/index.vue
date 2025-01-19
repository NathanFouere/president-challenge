<script setup lang="ts">
import container from '../../../config/container';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { StatePresenter } from '~/presenters/state/state.presenter';
import LicensedFileComponent from '~/components/common/licensed-file-component.vue';
import LineChartComponent from '~/components/common/charts/line-chart-component.vue';

usePageTitle().setTitle('State');

const statePresenter = container.get<StatePresenter>(COMMON_DEPENDANCY_TYPES.StatePresenter);

onMounted(async () => {
  await statePresenter.getState();
});
</script>

<template>
  <div class="h-full">
    <div class="text-center my-2">
      <div
        v-if="statePresenter.stateStore.isGettingState || statePresenter.stateStore.hasErrorOnGetState || !statePresenter.stateStore.getState"
        class="justify-center"
      >
        <USkeleton class="h-24 w-full" />
      </div>
      <div
        v-else
        class="justify-center"
      >
        {{ statePresenter.stateStore.getState.name }}
      </div>
    </div>

    <div class="justify-between">
      <USkeleton
        v-if="statePresenter.stateStore.isGettingState || statePresenter.stateStore.hasErrorOnGetState || !statePresenter.stateStore.getState"
        class="h-64 w-full"
      />
      <div v-else>
        <LicensedFileComponent
          :licensed-file="statePresenter.stateStore.getState.flag"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <USkeleton
      v-if="statePresenter.stateStore.isGettingState || statePresenter.stateStore.hasErrorOnGetState || !statePresenter.stateStore.getState"
      class="h-64 w-full"
    />
    <div v-else>
      {{ statePresenter.stateStore.getState?.description }}
      <UDivider class="sticky pt-10 pb-10" />
      Budget :
      <div class="flex justify-center items-center gap-5">
        <budget-component
          v-for="(budget) in statePresenter.stateStore.requireState.budgets"
          :key="budget.id"
          :budget="budget"
        />
      </div>
    </div>
    <UDivider class="sticky pt-10 pb-10" />
    Economical Situation : {{ statePresenter.stateStore.getState?.economicalSituation }}
    <br>

    <div>
      <USkeleton
        v-if="statePresenter.stateStore.isGettingState || statePresenter.stateStore.hasErrorOnGetState || !statePresenter.stateStore.getState"
        class="h-64 w-full"
      />
      <LineChartComponent
        v-else
        :data="statePresenter.stateStore.getState.economicalSituationPerMonthChartData"
      />
    </div>
  </div>
</template>
