<script setup lang="ts">
import type { MinimalSectorDto } from '@president-challenge/shared/dist/sector/minimal-sector-dto';
import LicensedFileComponent from '../common/licensed-file-component.vue';

defineProps<{
  sector: MinimalSectorDto;
}>();
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="font-bold">
        {{ sector.name }}
      </h2>
      <h2>{{ sector.description }}</h2>
    </template>
    <licensed-file-component :licensed-file="sector.licensedFile" />
    <template #footer>
      <UButton
        label="View"
        :to="`/sectors/${sector.id}`"
      />
    </template>
  </UCard>
</template>
