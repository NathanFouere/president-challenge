<script setup lang="ts">
import type { PoliticalPartyMinimalDto } from '@president-challenge/shared/dist/political-party/political-party-minimal-dto';
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
        (<i>{{ minimalPoliticalParty.affiliation }}</i>)
        <br>
        <b>{{ minimalPoliticalParty.inPower ? 'Is in government' : 'Is in the opposition' }}</b>
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
      <UButton
        label="Details"
        @click="() => navigateTo(`/political-parties/${minimalPoliticalParty.id}`)"
      />
    </template>
  </UCard>
</template>
