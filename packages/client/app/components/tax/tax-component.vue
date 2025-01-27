<script setup lang="ts">
import type TaxDto from '@shared/tax/tax-dto';

defineProps<{
  tax: TaxDto;
}>();
</script>

<template>
  <UCard>
    <template #header>
      {{ tax.name }}
    </template>
    <template #default>
      {{ tax.description }}
      <p>
        Level : <span :style="`color: ${tax.level.color}`">{{ tax.level.name }}</span>
      </p>
    </template>
  </UCard>
</template>
