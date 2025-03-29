<script setup lang="ts">
import type { LicensedFileDTO } from '@president-challenge/shared/dist/licensed-file/licensed-file-dto';

defineProps<{
  licensedFiles: LicensedFileDTO[];
}>();
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="licensedFiles"
    :ui="{
      item: 'basis-full',
    }"
    class="rounded-lg overflow-hidden"
    arrows
  >
    <UTooltip
      class="flex justify-center items-center w-full h-full"
      :ui="{
        base: 'h-full w-full flex justify-center items-center',
      }"
    >
      <template #text>
        <div>
          <p>{{ item.title }}</p>
          <p v-if="item.source">
            {{ item.source }}
          </p>
          <p v-if="item.attribution">
            {{ item.attribution }}
          </p>
          <p v-if="item.date">
            {{ item.date }}
          </p>
        </div>
      </template>

      <img
        draggable="false"
        :src="item.url"
        :alt="item.title"
      >
    </UTooltip>
  </UCarousel>
</template>
