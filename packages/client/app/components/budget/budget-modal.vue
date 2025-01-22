<script setup lang="ts">
import container from '~~/config/container';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { BudgetPresenter } from '~/presenters/state/budget.presenter';
import LicensedFileComponent from '~/components/common/licensed-file-component.vue';
import LineChartComponent from '~/components/common/charts/line-chart-component.vue';

const props = defineProps<{
  budgetId: number;
}>();

const budgetPresenter = container.get<BudgetPresenter>(COMMON_DEPENDANCY_TYPES.BudgetPresenter);

const isOpen = ref(false);

watch(
  () => isOpen.value,
  async () => {
    if (isOpen.value) {
      await budgetPresenter.getBudget(props.budgetId);
    }
  },
);
</script>

<template>
  <UButton
    label="Details"
    :loading="budgetPresenter.budgetStore.isGettingBudget && isOpen"
    @click="isOpen = true"
  />

  <UModal v-model="isOpen">
    <UCard
      v-if="budgetPresenter.budgetStore.isGettingBudget"
    >
      <USkeleton class="h-24 w-full mb-4" />
    </UCard>
    <UCard v-else>
      <template #header>
        <div class="flex justify-between items-center">
          <p>
            <USkeleton
              v-if="budgetPresenter.budgetStore.isGettingBudget"
              class="h-6 w-40"
            />
            <span v-else>{{ budgetPresenter.budgetStore.requireBudget.name }}</span>
          </p>
          <UIcon
            name="i-heroicons-x-mark"
            @click="isOpen = false"
          />
        </div>
      </template>

      <LicensedFileComponent
        :licensed-file="budgetPresenter.budgetStore.requireBudget.licensedFile"
        :loading="budgetPresenter.budgetStore.isGettingBudget"
      />
      <p>Description : {{ budgetPresenter.budgetStore.requireBudget.description }}</p>
      <p>
        Level : <span :style="`color: ${budgetPresenter.budgetStore.requireBudget.level.color}`">{{ budgetPresenter.budgetStore.requireBudget.level.name }}</span>
      </p>
      <p>Cost : {{ budgetPresenter.budgetStore.requireBudget.cost }}</p>
      <LineChartComponent :data="budgetPresenter.budgetStore.requireBudget.costPerMonthChartData" />
    </UCard>
  </umodal>
</template>
