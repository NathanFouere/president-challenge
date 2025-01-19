<script setup lang="ts">
import container from '~~/config/container';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { BudgetPresenter } from '~/presenters/state/budget.presenter';
import LicensedFileComponent from '~/components/common/licensed-file-component.vue';

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
    <UCard>
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

      <div v-if="budgetPresenter.budgetStore.isGettingBudget">
        <USkeleton class="h-24 w-full mb-4" />
        <USkeleton class="h-6 w-1/2 mb-2" />
        <USkeleton class="h-6 w-1/3" />
      </div>
      <div v-else>
        <LicensedFileComponent
          :licensed-file="budgetPresenter.budgetStore.requireBudget.licensedFile"
        />
      </div>
    </UCard>
  </umodal>
</template>
