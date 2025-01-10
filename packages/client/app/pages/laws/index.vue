<script setup lang="ts">
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import container from '~~/config/container';
import type { LawCategoriesPresenter } from '~/presenters/legislation/law-categories.presenter';

usePageTitle().setTitle('Laws');

const lawCategoriesPresenter = container.get<LawCategoriesPresenter>(COMMON_DEPENDANCY_TYPES.LawCategoriesPresenter);

onMounted(async () => {
  await lawCategoriesPresenter.getLawCategories();
});
</script>

<template>
  {{ lawCategoriesPresenter.lawCategoriesStore.lawCategories }}
  <u-accordion
    v-for="lawGroup in lawCategoriesPresenter.lawCategoriesStore.lawCategories"
    :key="lawGroup.id"
  />
</template>
