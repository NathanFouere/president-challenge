<script setup lang="ts">
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import container from '../../../config/container';
import type { SectorPresenter } from '../../presenters/sector/sector.presenter';
import LicensedFileComponent from '../../components/common/licensed-file-component.vue';

const route = useRoute();
const id = Number(route.params.id);

const sectorPresenter = container.get<SectorPresenter>(COMMON_DEPENDANCY_TYPES.SectorPresenter);

onMounted(async () => {
  await sectorPresenter.getSector(id);
});
</script>

<template>
  <USkeleton
    v-if="sectorPresenter.sectorStore.isGettingSector"
    class="w-full h-64"
  />
  <div
    v-else-if="sectorPresenter.sectorStore.hasSector"
  >
    <h1 class="text-center">
      {{ sectorPresenter.sectorStore.requireSector.name }}
    </h1>
    <h2 class="text-center">
      {{ sectorPresenter.sectorStore.requireSector.description }}
    </h2>
    <div class="flex-1 flex justify-center">
      <licensed-file-component
        class="w-3/12"
        :licensed-file="sectorPresenter.sectorStore.requireSector.licensedFile"
      />
    </div>
    <br>
    <UDivider />
    <br>
    <h2 class="text-center">
      Products
    </h2>
    <br>
    <div class="flex flex-nowrap justify-center gap-4">
      <product-component
        v-for="(product) in sectorPresenter.sectorStore.requireSector.products"
        :key="product.id"
        class="flex-1"
        :product="product"
      />
    </div>
    <br>
    <UDivider />
    <br>
    <h2
      class="text-center"
    >
      Social Classes
    </h2>
    <br>
    <div class="flex flex-nowrap justify-center gap-4">
      <social-class-component
        v-for="(socialClass) in sectorPresenter.sectorStore.requireSector.socialClasses"
        :key="socialClass.id"
        class="flex-1"
        :social-class="socialClass"
      />
    </div>
  </div>
</template>
