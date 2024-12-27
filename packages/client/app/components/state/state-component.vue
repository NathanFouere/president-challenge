<script setup lang="ts">
import type { StateDto } from '@shared/typesstate/state-dto';
import LicensedFileComponent from '../common/licensed-file-component.vue';

defineProps<{
  state: StateDto | null;
  isLoading: boolean;
  hadError: boolean;
}>();
</script>

<template>
  <UCard
    class="h-full text-center"
  >
    <template #header>
      <div
        v-if="isLoading || hadError"
        class="justify-center"
      >
        <USkeleton class="h-24 w-full" />
      </div>
      <div
        v-else
        class="justify-center"
      >
        {{ state?.name }}
      </div>
    </template>

    <div
      class="justify-between"
    >
      <USkeleton
        v-if="isLoading || hadError || !state"
        class="h-64 w-full"
      />
      <licensed-file-component
        v-else
        :licensed-file="state?.flag"
        class="w-full h-full object-cover"
      />
    </div>
    <template #footer>
      <USkeleton
        v-if="isLoading || hadError"
        class="h-64 w-full"
      />
      <p v-else>
        {{ state?.description }}
      </p>
    </template>
  </UCard>
</template>
