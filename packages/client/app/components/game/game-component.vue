<script setup lang="ts">
import type { MinimalGameDto } from '@shared/game/minimal-game-dto';
import { getDateFromTurnNumber } from '@shared/utils/date-converter';
import ConfirmDeletionModal from '../common/modal/confirm-deletion-modal.vue';

const props = defineProps<{
  game: MinimalGameDto;
  isSelected: boolean;
  isSelectingGame: boolean;
  pendingDeletion: boolean;
}>();

const emit = defineEmits<{
  (event: 'deleteGame', deletedGameId: number): void;
  (event: 'selectGame', selectedGame: MinimalGameDto): void;
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
      Turn {{ game.turn }} : {{ getDateFromTurnNumber(game.turn) }}
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
          :loading="isSelectingGame"
          @click="handleSelect"
        />
      </div>
    </template>
  </UCard>
</template>
