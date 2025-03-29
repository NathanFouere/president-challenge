<script setup lang="ts">
import type { MinimalProductDto } from '@president-challenge/shared/dist/product/minimal-product-dto';
import LicensedFileComponent from '../common/licensed-file-component.vue';

defineProps<{
  product: MinimalProductDto;
}>();
</script>

<template>
  <UCard>
    <template #header>
      {{ product.name }}
    </template>
    <licensed-file-component
      :licensed-file="product.licensedFile"
    />
    <template #footer>
      <div>
        <p>Price: {{ product.price }}</p>
        <p>Cost of production: {{ product.costOfProduction }}</p>
      </div>

      <product-modal
        :product-id="product.id"
      />
    </template>
  </UCard>
</template>
