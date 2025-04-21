<script setup lang="ts">
import { getDateFromTurnNumber } from '@president-challenge/shared/dist/utils/date-converter';
import container from '../../../config/container';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { TurnInformationsPresenter } from '~/presenters/turn-informations/turn-informations.presenter';

const turnInformationsPresenter = container.get<TurnInformationsPresenter>(COMMON_DEPENDANCY_TYPES.TurnInformationsPresenter);
// TODO => This page should be refactored because it has evolved a lot

usePageTitle().setTitle('Informations for ' + getDateFromTurnNumber(turnInformationsPresenter.gameStore.getSelectedGameTurn));

const selectedTurn = computed(() => turnInformationsPresenter.gameStore.getSelectedGameTurn);
watch(selectedTurn, async () => {
  usePageTitle().setTitle('Informations for ' + getDateFromTurnNumber(selectedTurn.value));
});

onMounted(async () => {
  await turnInformationsPresenter.getTurnInformations();
});
</script>

<template>
  <USkeleton
    v-if="turnInformationsPresenter.turnInformationsStore.isGettingTurnInformations"
    class="w-full h-64"
  />
  <div v-else>
    <div
      class="flex flex-wrap justify-center gap-4"
    >
      <event-component
        v-for="(event) in turnInformationsPresenter.eventsStore.getSuperEvents"
        :key="event.id"
        :event="event"
        modal-opened-by-default
        class="mb-3 flex-1"
      />
    </div>
    <div
      class="flex flex-wrap justify-center gap-4"
    >
      <event-component
        v-for="(event) in turnInformationsPresenter.eventsStore.getChoiceEvents"
        :key="event.id"
        :event="event"
        class="mb-3 flex-1"
      />
    </div>
    <div
      class="flex flex-wrap justify-center gap-4"
    >
      <event-component
        v-for="(event) in turnInformationsPresenter.eventsStore.getHistoricalEvents"
        :key="event.id"
        :event="event"
        class="mb-3 flex-1"
      />
    </div>
    <div
      class="text-center"
    >
      <UTooltip
        :text="turnInformationsPresenter.turnInformationsStore.getTurnInformations!.canChangeTurnContext"
      >
        <UButton
          :loading="turnInformationsPresenter.gameStore.isChangingTurn"
          :disabled="turnInformationsPresenter.turnInformationsStore.getTurnInformations!.canChangeTurn"
          @click="turnInformationsPresenter.changeTurn()"
        >
          {{ turnInformationsPresenter.turnInformationsStore.getTurnProcessDatas?.message ?? 'Change turn' }}
        </UButton>
      </UTooltip>
    </div>
  </div>
</template>
