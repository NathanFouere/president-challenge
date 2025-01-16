<script setup lang="ts">
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { LawPresenter } from '~/presenters/legislation/law.presenter';
import container from '~~/config/container';

const props = defineProps<{
  lawId: number;
  alreadyVoted: boolean;
}>();

const lawPresenter = container.get<LawPresenter>(COMMON_DEPENDANCY_TYPES.LawPresenter);

const isOpen = ref(false);

watch(
  () => isOpen.value,
  async () => {
    if (isOpen.value) {
      await lawPresenter.getLaw(props.lawId);
    }
  },
);
</script>

<template>
  <UButton
    label="Details"
    @click="isOpen = true"
  />

  <UModal
    v-model="isOpen"
  >
    <UCard class="inline-block">
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
        <div v-if="lawPresenter.lawStore.requireLaw.lastVoteResultsDatas">
          <br>
          <UDivider />
          <br>
          <law-election-results-component
            class="flex-1 overflow-auto"
            :vote-results-datas="lawPresenter.lawStore.requireLaw.lastVoteResultsDatas"
          />
        </div>
      </div>

      <template #footer>
        <UButton
          class="align-baseline"
          :label="alreadyVoted ? 'Already voted' : 'Vote for'"
          :disabled="alreadyVoted"
          :loading="lawPresenter.lawStore.isVotingLaw"
          @click="lawPresenter.voteLaw(props.lawId)"
        />
      </template>
    </UCard>
  </UModal>
</template>
