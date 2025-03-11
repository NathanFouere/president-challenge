<script setup lang="ts">
import type HappinessModifierDto from '@president-challenge/shared/dist/common/happiness-modifier-dto';
import { HappinessModifierType } from '@president-challenge/shared/dist/common/happiness-modifier-type';

defineProps<{
  happinessModifiers: HappinessModifierDto[];
}>();

const columns = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'type',
    label: 'Type',
  },
  {
    key: 'duration',
    label: 'Duration',
  },
  {
    key: 'amount',
    label: 'Amount',
  },
];
</script>

<template>
  <UTable
    :rows="happinessModifiers"
    :columns="columns"
    :empty-state="{ icon: '', label: 'No happiness modifiers' }"
    class="text-left text-yellow-500"
  >
    <template #amount-data="{ row }">
      <span
        :class="{
          'text-green-500': row.amount > 0,
          'text-red-500': row.amount < 0,
        }"
      >
        {{ row.amount }}
      </span>
    </template>
    <template #type-data="{ row }">
      <span
        :class="{
          'text-yellow-500': row.type === HappinessModifierType.TEMPORARY,
          'text-orange-500': row.type === HappinessModifierType.PERMANENT,
        }"
      >
        {{ row.type }}
      </span>
    </template>
  </UTable>
</template>
