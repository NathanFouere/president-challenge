<script setup lang="ts">
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import container from '../../../config/container';
import type { TurnInformationsPresenter } from '../../presenters/turn-informations/turn-informations.presenter';

const turnInformationsPresenter = container.get<TurnInformationsPresenter>(COMMON_DEPENDANCY_TYPES.TurnInformationsPresenter);

usePageTitle().setTitle('Informations for ' + getDateFromTurnNumber(turnInformationsPresenter.gameStore.getSelectedGameTurn));

// TODO => really hacky, need to find a better way to do this
const selectedTurn = computed(() => turnInformationsPresenter.gameStore.getSelectedGameTurn);
watch(selectedTurn, async () => {
  usePageTitle().setTitle('Informations for ' + getDateFromTurnNumber(selectedTurn.value));
});

onMounted(async () => {
  await turnInformationsPresenter.getEventsOfTurn();
});
</script>

<template>
  <div>
    <div
      class="flex flex-wrap justify-center gap-4"
    >
      <event-component
        v-for="(event) in turnInformationsPresenter.eventsStore.getSuperEvents"
        :key="event.id"
        :is-selected="false"
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
        :is-selected="false"
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
        :is-selected="false"
        :event="event"
        class="mb-3 flex-1"
      />
    </div>
  </div>
  <div
    class="text-center"
  >
    <UButton
      :loading="turnInformationsPresenter.gameStore.isChangingTurn"
      @click="turnInformationsPresenter.changeTurn()"
    >
      Change turn
    </UButton>
  </div>
</template>
