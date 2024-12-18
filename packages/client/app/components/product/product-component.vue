<script setup lang="ts">
import type { ProductDto } from '@shared/types/dist/types/product/product-dto';
import LicensedFileComponent from '../common/licensed-file-component.vue';

defineProps<{
  product: ProductDto;
}>();
</script>

<template>
  <UCard>
    <template #header>
      {{ product.name }}
    </template>
    <LicensedFileComponent
      :licensed-file="product.licensedFile"
    />
    <template #footer>
      <div>
        <p>Price: {{ product.price }}</p>
        <p>Cost of production: {{ product.costOfProduction }}</p>
      </div>
      <product-modal :product-id="product.id" />
    </template>
  </UCard>
</template>
