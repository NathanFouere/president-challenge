<script setup lang="ts">
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import container from '../../../config/container';
import type { TurnInformationsPresenter } from '../../presenters/turn-informations/turn-informations.presenter';

const turnInformationsPresenter = container.get<TurnInformationsPresenter>(COMMON_DEPENDANCY_TYPES.TurnInformationsPresenter);

usePageTitle().setTitle('Informations for ' + getDateFromTurnNumber(turnInformationsPresenter.gameStore.getSelectedGameTurn));

onMounted(async () => {
  await turnInformationsPresenter.getEventsOfTurn();
});
</script>

<template>
  <div
    class="grid grid-cols-6 gap-4"
  >
    <event-component
      v-for="(event) in turnInformationsPresenter.eventsStore.getSuperEvents"
      :key="event.id"
      :is-selected="false"
      :event="event"
      modal-opened-by-default
      class="mb-3"
    />
  </div>
  <div
    class="grid grid-cols-6 gap-4"
  >
    <event-component
      v-for="(event) in turnInformationsPresenter.eventsStore.getChoiceEvents"
      :key="event.id"
      :is-selected="false"
      :event="event"
      class="mb-3"
    />
  </div>
  <div
    class="grid grid-cols-6 gap-4"
  >
    <event-component
      v-for="(event) in turnInformationsPresenter.eventsStore.getHistoricalEvents"
      :key="event.id"
      :is-selected="false"
      :event="event"
      class="mb-3"
    />
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
