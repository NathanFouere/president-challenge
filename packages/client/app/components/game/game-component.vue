<script setup lang="ts">
import type { Game } from '@shared/typesgame/game';
import { getDateFromTurnNumber } from '../../utils/date-converter';
import ConfirmDeletion from '../common/modal/confirm-deletion.vue';

const props = defineProps<{
  game: Game;
  isSelected: boolean;
  pendingDeletion: boolean;
}>();

const isOpen = ref(false);

const emit = defineEmits<{
  (event: 'deleteGame', deletedGameId: number): void;
  (event: 'selectGame', selectedGame: Game): void;
}>();

const handleDelete = () => {
  emit('deleteGame', props.game.id);
};

const handleSelect = () => {
  emit('selectGame', props.game);
};
</script>

<template>
  <UCard
    class="min-h-32"
    :class="isSelected ? 'ring-gray-300 dark:ring-gray-70' : '' "
  >
    <template #header>
      Turn {{ game.turnNumber }} : {{ getDateFromTurnNumber(game.turnNumber) }}
    </template>

    <template #footer>
      <div class="flex justify-between items-center">
        <UButton
          label="Delete"
          :loading="pendingDeletion"
          @click="isOpen = true"
        />

        <UButton
          label="Select"
          :disabled="isSelected"
          @click="handleSelect"
        />
        <confirm-deletion
          :model-value="isOpen"
          :is-pending-deletion="pendingDeletion"
          @confirm-deletion="handleDelete"
        />
      </div>
    </template>
  </UCard>
</template>
