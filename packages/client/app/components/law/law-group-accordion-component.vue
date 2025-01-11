<script setup lang="ts">
import type { LawCategoryDto } from '@shared/legislature/law-category-dto';
import type { LawGroupDto } from '@shared/legislature/law-group-dto';
import type { MinimalLawDto } from '@shared/legislature/minimal-law-dto';

const props = defineProps<{
  lawCategory: LawCategoryDto;
}>();

// TODO => ugly, but actually forced to do this because of the way the data is structured
interface LawGroupAccordionItem {
  label: string;
  content: string;
  propertyLaws: MinimalLawDto[];
}

const items: LawGroupAccordionItem[] = props.lawCategory.lawGroups.map((lawGroup: LawGroupDto) => {
  return {
    label: lawGroup.name,
    content: lawGroup.description,
    propertyLaws: lawGroup.propertyLaws,
  };
});
</script>

<template>
  <UAccordion
    :key="lawCategory.id"
    :items="items"
  >
    <template #item="{ item }">
      <law-accordion-item-component :rows="item.propertyLaws" />
    </template>
  </UAccordion>
</template>
