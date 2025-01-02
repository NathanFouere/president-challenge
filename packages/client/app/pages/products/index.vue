<script setup lang="ts">
import container from '../../../config/container';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { ProductsPresenter } from '~/presenters/product/products.presenter';

usePageTitle().setTitle('Products');

const productsPresenter = container.get<ProductsPresenter>(COMMON_DEPENDANCY_TYPES.ProductsPresenter);

onMounted(async () => {
  await productsPresenter.getProducts();
});
</script>

<template>
  <div
    class="flex flex-nowrap justify-center gap-4"
  >
    <USkeleton
      v-if="productsPresenter.productStore.isGettingProducts"
      class="w-full h-64 "
    />
    <product-component
      v-for="(product) in productsPresenter.productStore.getProducts"
      v-else
      :key="product.id"
      class="flex-1"
      :product="product"
    />
  </div>
</template>
