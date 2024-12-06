<script setup lang="ts">
import type { PoliticalPartyMinimalDto } from '@shared/typespolitical-party/political-party-minimal-dto';
import LicensedFileComponent from '../common/licensed-file-component.vue';

defineProps<{
  minimalPoliticalParty: PoliticalPartyMinimalDto;
}>();
</script>

<template>
  <UCard>
    <template
      #header
    >
      <div class="text-center h-64">
        {{ minimalPoliticalParty.name }}
        <br>
        <licensed-file-component
          class="h-48"
          :licensed-file="minimalPoliticalParty.licensedFile"
        />
        <br>
        {{ minimalPoliticalParty.affiliation }}
      </div>
    </template>

    <template
      #footer
    >
      <div class="flex justify-between items-center">
        <UButton
          label="Details"
          @click="() => navigateTo(`/political-parties/${minimalPoliticalParty.id}`)"
        />
      </div>
    </template>
  </UCard>
</template>
