<script setup lang="ts">
import type { LicensedFileDTO } from '@president-challenge/shared/dist/licensed-file/licensed-file-dto';

defineProps<{
  licensedFile: LicensedFileDTO;
}>();
</script>

<template>
  <UTooltip
    class="flex justify-center items-center"
    :ui="{
      item: 'basis-full',
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
      class="h-80"
      :src="licensedFile.url"
      :alt="licensedFile.title"
    >
  </UTooltip>
</template>
