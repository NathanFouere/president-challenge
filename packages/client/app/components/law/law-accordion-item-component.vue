<script setup lang="ts">
import type { MinimalLawDto } from '@shared/legislature/minimal-law-dto';

defineProps<{
  rows: MinimalLawDto[];
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
    key: 'voted',
    label: 'Voted',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];
</script>

<template>
  <UTable
    :rows="rows"
    :columns="columns"
    :empty-state="{ icon: '', label: 'No laws' }"
    class="text-left"
  >
    <template #voted-data="{ row }">
      <span>
        <UIcon
          :name="row.voted ? 'i-heroicons-check' : 'i-heroicons-x-mark'"
          class="text-green"
        />
        {{ row.voted ? 'Voted' : 'Not voted' }}
      </span>
    </template>
    <template #actions-data="{ row }">
      <law-modal
        :law-id="row.id"
        :already-voted="row.voted"
        :type="row.type"
      />
    </template>
  </UTable>
</template>
