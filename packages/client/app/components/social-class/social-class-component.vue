<script setup lang="ts">
import type { MinimalSocialClassDto } from '@shared/typessocial-class/minimal-social-class-dto';
import LicensedFileComponent from '../common/licensed-file-component.vue';

const props = defineProps<{
  socialClass: MinimalSocialClassDto;
}>();
</script>

<template>
  <UCard>
    <template #header>
      <h2>{{ socialClass.name }}</h2>
    </template>
    <licensed-file-component :licensed-file="socialClass.licensedFile" />
    <template #footer>
      <UButton
        label="View"
        :to="`/social-classes/${socialClass.id}`"
      />
    </template>
  </UCard>
</template>
