<script setup lang="ts">
import container from '../../../../config/container';
import type { EventPresenter } from '../../../presenters/events/event.presenter';
import { COMMON_DEPENDANCY_TYPES } from '../../../../config/common.types';
import LicensedFilesComponent from '../../common/licensed-files-component.vue';

const props = defineProps<{
  eventId: number;
  isSelected: boolean;
}>();
const eventPresenter = container.get<EventPresenter>(COMMON_DEPENDANCY_TYPES.EventPresenter);

const isOpen = ref(false);
watch(
  () => isOpen.value,
  async (newVal) => {
    if (newVal) {
      await eventPresenter.getEvent(props.eventId);
    }
  },
);
</script>

<template>
  <UButton
    label="Details"
    :loading="eventPresenter.eventStore.isGettingEvent && isOpen"
    @click="isOpen = true"
  />

  <UModal
    v-model="isOpen"
  >
    <UCard v-if="eventPresenter.eventStore.hasCurrentEvent">
      <template #header>
        <div
          class="flex justify-between items-center"
        >
          <p> {{ eventPresenter.eventStore.requireCurrentEvent.title }}</p>
          <UIcon
            name="i-heroicons-x-mark"
            @click="isOpen = false"
          />
        </div>
      </template>

      <licensed-files-component :licensed-files="eventPresenter.eventStore.requireCurrentEvent.licensedFiles" />
      <p> {{ eventPresenter.eventStore.requireCurrentEvent.text }}</p>

      <template
        v-if="eventPresenter.eventStore.requireCurrentEvent.choices.length > 0"
        #footer
      >
        <div class="flex justify-between items-center">
          <UButton
            v-for="choice in eventPresenter.eventStore.requireCurrentEvent.choices"
            :key="choice.id"
            :label="choice.text"
            :loading="eventPresenter.eventStore.getLoadingChoice === choice.id"
            @click="eventPresenter.chooseChoice(eventId, choice.id)"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
