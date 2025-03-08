<script setup lang="ts">
import type { PoliticalPartyMinimalDto } from '@shared/political-party/political-party-minimal-dto';
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
      <div class="justify-center">
        {{ minimalPoliticalParty.name }}
        ({{ minimalPoliticalParty.affiliation }})
        <p>In Power: {{ minimalPoliticalParty.inPower }}</p>
      </div>
    </template>

    <div
      class="justify-between"
    >
      <licensed-file-component
        :licensed-file="minimalPoliticalParty.licensedFile"
        class="w-full h-full object-cover"
      />
    </div>
    <template
      #footer
    >
      <div class="flex justify-center items-center">
        <UButton
          label="Details"
          @click="() => navigateTo(`/political-parties/${minimalPoliticalParty.id}`)"
        />
      </div>
    </template>
  </UCard>
</template>
