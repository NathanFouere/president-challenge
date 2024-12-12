<script setup lang="ts">
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import container from '../../../config/container';
import type { EventsPresenter } from '../../presenters/turn-informations/events.presenter';

const turnInfoPresenter = container.get<EventsPresenter>(COMMON_DEPENDANCY_TYPES.EventsPresenter);

usePageTitle().setTitle('Informations for ' + getDateFromTurnNumber(turnInfoPresenter.gameStore.getSelectedGameTurn));

onMounted(async () => {
  await turnInfoPresenter.getEventsOfTurn();
});
</script>

<template>
  <div
    class="grid grid-cols-6 gap-4"
  >
    <event-component
      v-for="(event) in turnInfoPresenter.eventsStore.getSuperEvents"
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
      v-for="(event) in turnInfoPresenter.eventsStore.getChoiceEvents"
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
      v-for="(event) in turnInfoPresenter.eventsStore.getHistoricalEvents"
      :key="event.id"
      :is-selected="false"
      :event="event"
      class="mb-3"
    />
  </div>
</template>
