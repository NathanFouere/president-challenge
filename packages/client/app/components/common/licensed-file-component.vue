<script setup lang="ts">
import type { LicensedFileDTO } from '@shared/typeslicensed-file/licensed-file-dto';

defineProps<{
  licensedFile: LicensedFileDTO;
}>();
</script>

<template>
  <UTooltip
    :ui="{
      base: 'h-full',
    }"
  >
    <template #text>
      <div>
        <p> {{ licensedFile.title }}</p>
        <p
          v-if="licensedFile.source"
        >
          {{ licensedFile.source }}
        </p>
        <p
          v-if="licensedFile.attribution"
        >
          {{ licensedFile.attribution }}
        </p>
        <p
          v-if="licensedFile.date"
        >
          {{ licensedFile.date }}
        </p>
      </div>
    </template>

    <img
      :src="licensedFile.path"
      :alt="licensedFile.title"
    >
  </UTooltip>
</template>
