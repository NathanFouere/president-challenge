<script setup lang="ts">
import type { MinimalBudgetDto } from '@president-challenge/shared/dist/state/minimal-budget-dto';

defineProps<{
  budget: MinimalBudgetDto;
}>();
</script>

<template>
  <UCard class="inline-block">
    <template #header>
      <p>{{ budget.name }}</p>
    </template>
    <p>Description : {{ budget.description }}</p>
    <p>
      Level : <span :style="`color: ${budget.level.color}`">{{ budget.level.name }}</span>
    </p>
    <p>Cost : {{ budget.cost }}</p>
    <template #footer>
      <budget-modal :budget-id="budget.id" />
    </template>
  </UCard>
</template>
