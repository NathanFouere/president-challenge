<script setup lang="ts">
import { computed } from 'vue';
import type { LawCategoryDto } from '@president-challenge/shared/dist/legislature/law-category-dto';
import type { LawGroupDto } from '@president-challenge/shared/dist/legislature/law-group-dto';

const props = defineProps<{
  lawCategory: LawCategoryDto;
}>();

const items = computed(() =>
  props.lawCategory.lawGroups.map((lawGroup: LawGroupDto) => ({
    label: lawGroup.name,
    content: lawGroup.description,
    laws: lawGroup.laws,
  })),
);
</script>

<template>
  <UAccordion
    :key="lawCategory.id"
    :items="items"
  >
    <template #item="{ item }">
      <law-accordion-item-component :rows="item.laws" />
    </template>
  </UAccordion>
</template>
