<script setup lang="ts">
import type { Game } from '@shared/typesgame/game';
import { getDateFromTurnNumber } from '../../utils/date-converter';
import ConfirmDeletionModal from '../common/modal/confirm-deletion-modal.vue';

const props = defineProps<{
  game: Game;
  isSelected: boolean;
  pendingDeletion: boolean;
}>();

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
        <confirm-deletion-modal
          :is-pending-deletion="pendingDeletion"
          @confirm-deletion="handleDelete"
        />

        <UButton
          label="Select"
          :disabled="isSelected || pendingDeletion"
          @click="handleSelect"
        />
      </div>
    </template>
  </UCard>
</template>
