<script setup lang="ts">
import container from '../../../config/container';
import LicensedFileComponent from '../common/licensed-file-component.vue';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { ProductPresenter } from '~/presenters/product/product.presenter';
import LineChartComponent from '~/components/common/charts/line-chart-component.vue';

const props = defineProps<{
  productId: number;
}>();

const productPresenter = container.get<ProductPresenter>(COMMON_DEPENDANCY_TYPES.ProductPresenter);

const isOpen = ref(false);
watch(
  () => isOpen.value,
  async () => {
    if (isOpen.value) {
      await productPresenter.getProduct(props.productId);
    }
  },
);
</script>

<template>
  <UButton
    label="Details"
    :loading="productPresenter.productStore.isGettingProduct && isOpen"
    @click="isOpen = true"
  />

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <p>
            <USkeleton
              v-if="productPresenter.productStore.isGettingProduct"
              class="h-6 w-40"
            />
            <span v-else>{{ productPresenter.productStore.getProduct?.name }}</span>
          </p>
          <UIcon
            name="i-heroicons-x-mark"
            @click="isOpen = false"
          />
        </div>
      </template>

      <div v-if="productPresenter.productStore.isGettingProduct">
        <USkeleton class="h-24 w-full mb-4" />
        <USkeleton class="h-6 w-1/2 mb-2" />
        <USkeleton class="h-6 w-1/3" />
      </div>
      <div v-else>
        <LicensedFileComponent
          :licensed-file="productPresenter.productStore.getProduct!.licensedFile"
        />
      </div>

      <template #footer>
        <div>
          <p v-if="productPresenter.productStore.isGettingProduct">
            <USkeleton class="h-6 w-1/3 mb-2" />
            <USkeleton class="h-6 w-1/3" />
          </p>
          <div v-else>
            <p>
              Price: {{ productPresenter.productStore.getProduct!.price }}
            </p>
            <p>
              Cost of production: {{ productPresenter.productStore.getProduct!.costOfProduction }}
            </p>
            <br>
            <LineChartComponent
              :data="productPresenter.productStore.getProduct!.pricePerMonthChartData"
            />
          </div>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
