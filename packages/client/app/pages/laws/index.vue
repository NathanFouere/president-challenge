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
  <UProgress
    v-show="true"
    :class="{
      invisible: !lawCategoriesPresenter.lawCategoriesStore.isGettingLawCategories,
    }"
    animation="carousel"
  />

  <div
    v-for="lawCategory in lawCategoriesPresenter.lawCategoriesStore.lawCategories"
    :key="lawCategory.id"
  >
    <h1 class="text-center">
      {{ lawCategory.name }}
    </h1>
    <br>
    <law-group-accordion-component
      :law-category="lawCategory"
    />
    <br>
    <UDivider class="sticky bottom-0" />
    <br>
  </div>
</template>
