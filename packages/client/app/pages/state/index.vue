<script setup lang="ts">
import container from '../../../config/container';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { StatePresenter } from '~/presenters/state/state.presenter';
import LicensedFileComponent from '~/components/common/licensed-file-component.vue';
import LineChartComponent from '~/components/common/charts/line-chart-component.vue';
import FinancialFlowsComponent from '~/components/financial-flow/financial-flows-component.vue';

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
        <h1 class="font-bold">
          {{ statePresenter.stateStore.getState.name }}
        </h1>
        <br>
        <LicensedFileComponent
          :licensed-file="statePresenter.stateStore.getState.flag"
        />
        <br>
        {{ statePresenter.stateStore.getState?.description }}
      </div>
    </div>

    <USkeleton
      v-if="statePresenter.stateStore.isGettingState || statePresenter.stateStore.hasErrorOnGetState || !statePresenter.stateStore.getState"
      class="h-64 w-full"
    />
    <div v-else>
      <UDivider class="sticky pt-10 pb-10" />
      <h1 class="text-center font-bold">
        Budget :
      </h1>
      <br>
      <div class="flex justify-center items-center gap-5">
        <budget-component
          v-for="(budget) in statePresenter.stateStore.requireState.budgets"
          :key="budget.id"
          :budget="budget"
        />
      </div>
      <UDivider class="sticky pt-10 pb-10" />
      <h1 class="text-center font-bold">
        Taxes :
      </h1>
      <br>
      <div class="flex justify-center items-center gap-5">
        <tax-component
          v-for="(tax) in statePresenter.stateStore.requireState.taxes"
          :key="tax.id"
          :tax="tax"
        />
      </div>
    </div>
    <UDivider class="sticky pt-10 pb-10" />

    <h1 class="text-center font-bold">
      Economical Situation : {{ statePresenter.stateStore.getState?.economicalSituation }}
    </h1>

    <br>

    <USkeleton
      v-if="statePresenter.stateStore.isGettingState || statePresenter.stateStore.hasErrorOnGetState || !statePresenter.stateStore.getState"
      class="h-64 w-full"
    />
    <div v-else>
      <LineChartComponent
        :data="statePresenter.stateStore.requireState.economicalSituationPerMonthChartData"
      />
      <financial-flows-component
        :financial-flows-chart-datas="statePresenter.stateStore.requireState.financialFlowDatas"
      />
    </div>
  </div>
</template>
