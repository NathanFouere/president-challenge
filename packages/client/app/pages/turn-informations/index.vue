<script setup lang="ts">
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import container from '../../../config/container';
import type { TurnInformationsPresenter } from '../../presenters/turn-informations/turn-informations.presenter';

const turnInfoPresenter = container.get<TurnInformationsPresenter>(COMMON_DEPENDANCY_TYPES.TurnInformationsPresenter);

usePageTitle().setTitle('Informations for ' + getDateFromTurnNumber(turnInfoPresenter.gameStore.getSelectedGameTurn));

const getEventsOfTurn = async () => {
  await turnInfoPresenter.getEventsOfTurn();
};
onMounted(async () => {
  await getEventsOfTurn();
});
</script>

<template>
  <div
    class="grid grid-cols-6 gap-4"
  >
    <template
      v-for="(event) in turnInfoPresenter.eventsStore.getEvents"
      :key="event.id"
    >
      <event-component
        :event="event"
        class="mb-3"
        @selected="getEventsOfTurn()"
      />
    </template>
  </div>
</template>
