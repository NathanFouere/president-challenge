<script setup lang="ts">
import type { MinimalEventDto } from '../../../../shared/src/event/minimal-event-dto';
import LicensedFileComponent from '../common/licensed-file-component.vue';

defineProps<{
  event: MinimalEventDto;
  isSelected: boolean;
}>();

const emit = defineEmits<{
  selected: () => void;
}>();

const hasBeenSelected = () => {
  emit('selected');
};
</script>

<template>
  <UCard>
    <template #header>
      {{ event.title }}
      <br>
      <i>{{ event.beenRead ? 'Has been read' : 'Needs to be read' }}</i>
    </template>
    <licensed-file-component
      class="h-48"
      :licensed-file="event.licensedFiles[0]!"
    />
    <template #footer>
      <div class="flex justify-end items-center">
        <event-modal
          :event-id="event.id"
          :is-selected="event.isSelected"
          @selected="hasBeenSelected()"
        />
      </div>
    </template>
  </UCard>
</template>
