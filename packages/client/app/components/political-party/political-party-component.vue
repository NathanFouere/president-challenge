<script setup lang="ts">
import type { PoliticalPartyMinimalDto } from '@shared/typespolitical-party/political-party-minimal-dto';
import LicensedFileComponent from '../common/licensed-file-component.vue';

defineProps<{
  minimalPoliticalParty: PoliticalPartyMinimalDto;
}>();
</script>

<template>
  <UCard
    class="h-full"
  >
    <template #header>
      <div class="flex items-center justify-center h-24 text-center overflow-hidden text-ellipsis">
        {{ minimalPoliticalParty.name }}
        ({{ minimalPoliticalParty.affiliation }})
      </div>
    </template>

    <div
      class="relative flex flex-col items-center justify-between h-64"
    >
      <licensed-file-component
        :licensed-file="minimalPoliticalParty.licensedFile"
        class="w-full h-full object-cover"
      />
    </div>
    <template
      #footer
    >
      <div class="flex justify-end items-center">
        <UButton
          label="Details"
          @click="() => navigateTo(`/political-parties/${minimalPoliticalParty.id}`)"
        />
      </div>
    </template>
  </UCard>
</template>
