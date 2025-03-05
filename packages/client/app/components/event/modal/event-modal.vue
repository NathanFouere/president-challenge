<script setup lang="ts">
import type { ChoiceDto } from '@shared/event/choice-dto';
import container from '../../../../config/container';
import LicensedFilesComponent from '../../common/licensed-files-component.vue';
import type { EventPresenter } from '~/presenters/events/event.presenter';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import BarCharComponent from '~/components/common/charts/bar-char-component.vue';
import ElectionResultsComponent from '~/components/event/modal/election-results-component.vue';

const props = defineProps<{
  eventId: number;
  isSelected: boolean;
  openedByDefault?: boolean;
}>();

const eventPresenter = container.get<EventPresenter>(COMMON_DEPENDANCY_TYPES.EventPresenter);

const isOpen = ref(props.openedByDefault ?? false);
watch(
  () => isOpen.value,
  async () => {
    await eventPresenter.getEvent(props.eventId);
  },
);

onMounted(async () => {
  if (props.openedByDefault) {
    await eventPresenter.getEvent(props.eventId);
  }
});

const getChoiceIcon = (choice: ChoiceDto) => {
  switch (choice.status) {
    case 'chosen':
      return 'i-heroicons-check';
    case 'unavailable':
      return 'i-heroicons-x-mark';
    default:
      return '';
  }
};
</script>

<template>
  <UButton
    v-if="!props.openedByDefault"
    label="Details"
    :loading="eventPresenter.eventStore.isGettingEvent && isOpen"
    @click="isOpen = true"
  />

  <UModal
    v-model="isOpen"
  >
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <USkeleton
            v-if="eventPresenter.eventStore.isGettingEvent"
            width="150px"
            height="24px"
          />
          <p v-else>
            {{ eventPresenter.eventStore.requireCurrentEvent.title }}
          </p>
          <UIcon
            name="i-heroicons-x-mark"
            @click="isOpen = false"
          />
        </div>
      </template>

      <template v-if="eventPresenter.eventStore.isGettingEvent">
        <USkeleton class="h-64 w-full mb-4" />
        <USkeleton class="h-64 w-full mb-4" />
        <USkeleton class="h-24 w-full mb-4" />
      </template>
      <template v-else>
        <licensed-files-component :licensed-files="eventPresenter.eventStore.requireCurrentEvent.licensedFiles" />
        <br>
        <p>{{ eventPresenter.eventStore.requireCurrentEvent.text }}</p>
        <br>
        <election-results-component
          v-if="eventPresenter.eventStore.requireCurrentEvent.electionResults"
          :election-results="eventPresenter.eventStore.requireCurrentEvent.electionResults"
        />
      </template>

      <template
        v-if="!eventPresenter.eventStore.isGettingEvent && eventPresenter.eventStore.requireCurrentEvent.choices.length > 0"
        #footer
      >
        <div class="flex justify-between items-center">
          <UButton
            v-for="choice in eventPresenter.eventStore.requireCurrentEvent.choices"
            :key="choice.id"
            :icon="getChoiceIcon(choice)"
            :disabled="choice.status != 'available'"
            :label="choice.text"
            :loading="eventPresenter.eventStore.getLoadingChoice === choice.id"
            @click="eventPresenter.chooseChoice(eventId, choice.id)"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
