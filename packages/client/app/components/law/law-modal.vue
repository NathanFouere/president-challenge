<script setup lang="ts">
import type { LawType } from '@shared/legislature/law-type';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { LawPresenter } from '~/presenters/legislation/law.presenter';
import container from '~~/config/container';

const props = defineProps<{
  lawId: number;
  type: LawType;
  alreadyVoted: boolean;
}>();

const lawPresenter = container.get<LawPresenter>(COMMON_DEPENDANCY_TYPES.LawPresenter);

const isOpen = ref(false);

watch(
  () => isOpen.value,
  async () => {
    if (isOpen.value) {
      await lawPresenter.getLaw(props.lawId, props.type);
    }
  },
);
</script>

<template>
  <UButton
    label="Details"
    @click="isOpen = true"
  />

  <UModal v-model="isOpen">
    <UCard>
      <USkeleton
        v-if="lawPresenter.lawStore.isGettingLaw || !lawPresenter.lawStore.hasLaw"
        class="w-full h-64 "
      />
      <template #header>
        <USkeleton
          v-if="lawPresenter.lawStore.isGettingLaw || !lawPresenter.lawStore.hasLaw"
          class="w-full h-64 "
        />
        <div v-else>
          <p>{{ lawPresenter.lawStore.requireLaw.name }}</p>
        </div>
      </template>

      <USkeleton
        v-if="lawPresenter.lawStore.isGettingLaw || !lawPresenter.lawStore.hasLaw"
        class="w-full h-64 "
      />
      <div v-else>
        <p>{{ lawPresenter.lawStore.requireLaw.description }}</p>
      </div>

      <template #footer>
        <UButton
          :label="alreadyVoted ? 'Already voted' : 'Vote for'"
          :disabled="alreadyVoted"
          @click="lawPresenter.voteLaw(props.lawId, props.type)"
        />
      </template>
    </UCard>
  </UModal>
</template>
