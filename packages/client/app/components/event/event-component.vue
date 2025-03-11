<script setup lang="ts">
import type { MinimalEventDto } from '@president-challenge/shared/dist/event/minimal-event-dto';
import LicensedFileComponent from '../common/licensed-file-component.vue';

defineProps<{
  event: MinimalEventDto;
  isSelected: boolean;
  modalOpenedByDefault?: boolean;
}>();
</script>

<template>
  <UCard>
    <template #header>
      {{ event.title }}
      <br>
      <br>
      <i>{{ event.beenRead ? 'Has been read' : 'Needs to be read' }}</i>
      <br>
      <i>{{ event.needsAction ? 'Needs action' : 'Doesnt need action' }}</i>
    </template>
    <div
      class="justify-between"
    >
      <licensed-file-component
        :licensed-file="event.licensedFile!"
      />
    </div>
    <template #footer>
      <div class="flex justify-center items-center">
        <event-modal
          :event-id="event.id"
          :is-selected="false"
          :opened-by-default="modalOpenedByDefault"
        />
      </div>
    </template>
  </UCard>
</template>
