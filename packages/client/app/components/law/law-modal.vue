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

const tooltip = ref('');

watch(
  () => lawPresenter.lawStore.getLaw,
  () => {
    if (lawPresenter.lawStore.requireLaw) {
      if (lawPresenter.lawStore.requireLaw.voted) {
        tooltip.value = 'Law is already voted';
      }
      else if (lawPresenter.lawStore.requireLaw.superiorToAvailablePoliticalWeight) {
        tooltip.value = 'Law required political weight is superior to available one';
      }
      else if (lawPresenter.lawStore.requireLaw.alreadyVotedForThisTurn) {
        tooltip.value = 'You already voted for this law on this turn';
      }
      else {
        tooltip.value = 'Vote for Law';
      }
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
          <p>Political Weight required : {{ lawPresenter.lawStore.requireLaw.politicalWeightRequired }}</p>
        </div>
      </template>

      <USkeleton
        v-if="lawPresenter.lawStore.isGettingLaw || !lawPresenter.lawStore.hasLaw"
        class="w-full h-64 "
      />
      <div v-else>
        <p>{{ lawPresenter.lawStore.requireLaw.description }}</p>
        <UDivider class="sticky pt-10 pb-10" />
        <law-election-results-component
          v-if="lawPresenter.lawStore.requireLaw.voteResultsDatas.length"
          :vote-results-datas="lawPresenter.lawStore.requireLaw.voteResultsDatas"
        />
      </div>

      <template #footer>
        <USkeleton
          v-if="lawPresenter.lawStore.isGettingLaw || !lawPresenter.lawStore.hasLaw"
          class="w-full h-64 "
        />
        <UTooltip
          v-else
          class="align-baseline"
          :text="tooltip"
        >
          <UButton
            class="align-baseline"
            :label="alreadyVoted ? 'Already voted' : 'Vote for'"
            :disabled="lawPresenter.lawStore.requireLaw.voted || lawPresenter.lawStore.requireLaw.alreadyVotedForThisTurn || lawPresenter.lawStore.requireLaw.superiorToAvailablePoliticalWeight"
            :loading="lawPresenter.lawStore.isVotingLaw"
            @click="lawPresenter.voteLaw(props.lawId)"
          />
        </UTooltip>
      </template>
    </UCard>
  </UModal>
</template>
