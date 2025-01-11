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
  <UAccordion
    :key="lawCategory.id"
    :items="items"
  >
    <template #item="{ item }">
      <div>
        <UTable
          :rows="item.propertyLaws"
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
      </div>
    </template>
  </UAccordion>
</template>
