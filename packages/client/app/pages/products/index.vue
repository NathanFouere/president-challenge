<script setup lang="ts">
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import container from '../../../config/container';
import type { ProductPresenter } from '../../presenters/product/product.presenter';

usePageTitle().setTitle('Products');

const productPresenter = container.get<ProductPresenter>(COMMON_DEPENDANCY_TYPES.ProductPresenter);

onMounted(async () => {
  await productPresenter.getProducts();
});
</script>

<template>
  {{ productPresenter.productStore.getProducts }}
</template>
