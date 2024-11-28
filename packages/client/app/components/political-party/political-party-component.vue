<script setup lang="ts">
import type { PoliticalPartyMinimalDTO } from '../../../../shared/src/political-party/political-party-minimal-d-t-o';

defineProps<{
  minimalPoliticalParty: PoliticalPartyMinimalDTO;
}>();
</script>

<template>
  <UCard>
    <template #header>
      {{ minimalPoliticalParty.name }}
      <br>
      {{ minimalPoliticalParty.affiliation }}
    </template>

    <template #footer>
      <div class="flex justify-between items-center">
        <UButton
          label="Details"
          @click="() => navigateTo(`/political-parties/${minimalPoliticalParty.id}`)"
        />
      </div>
    </template>
  </UCard>
</template>

<style scoped>

</style>
