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

const emit = defineEmits<{
  selected: () => void;
}>();

const hasBeenSelected = () => {
  isOpen.value = true;
  emit('selected');
};

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
    @click="hasBeenSelected()"
  />

  <UModal v-model="isOpen">
    <UCard v-if="eventPresenter.eventStore.hasCurrentEvent">
      <template #header>
        <p> {{ eventPresenter.eventStore.currentEvent.title }}</p>
      </template>

      <licensed-files-component :licensed-files="eventPresenter.eventStore.currentEvent.licensedFiles" />
      <p> {{ eventPresenter.eventStore.currentEvent.text }}</p>

      <template #footer>
        <div class="flex justify-between items-center">
          <UButton
            label="Close"
            @click="isOpen = false"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
