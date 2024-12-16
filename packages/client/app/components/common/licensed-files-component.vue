<script setup lang="ts">
import type { LicensedFileDTO } from '@shared/typeslicensed-file/licensed-file-dto';

defineProps<{
  licensedFiles: LicensedFileDTO[];
}>();
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="licensedFiles"
    :ui="{ item: 'basis-full' }"
    class="rounded-lg overflow-hidden"
    arrows
  >
    <UTooltip
      class="flex justify-center items-center"
      :ui="{
        base: 'h-full',
      }"
    >
      <template #text>
        <div>
          <p> {{ item.title }}</p>
          <p
            v-if="item.source"
          >
            {{ item.source }}
          </p>
          <p
            v-if="item.attribution"
          >
            {{ item.attribution }}
          </p>
          <p
            v-if="item.date"
          >
            {{ item.date }}
          </p>
        </div>
      </template>

      <img
        draggable="false"
        :src="item.path"
        :alt="item.title"
      >
    </utooltip>
  </UCarousel>
</template>
