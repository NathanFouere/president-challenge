<script setup lang="ts">
import { getDateFromTurnNumber } from '@president-challenge/shared/dist/utils/date-converter';
import { GameStatus } from '@president-challenge/shared/dist/game/game_status';
import type { GameDefinitionDto } from '@president-challenge/shared/dist/game/game-definition-dto';
import ConfirmDeletionModal from '../common/modal/confirm-deletion-modal.vue';

const props = defineProps<{
  game: GameDefinitionDto;
  isSelected: boolean;
  isSelectingGame: boolean;
  pendingDeletion: boolean;
}>();

const emit = defineEmits<{
  (event: 'deleteGame', deletedGameId: number): void;
  (event: 'selectGame', selectedGame: GameDefinitionDto): void;
}>();

const handleDelete = () => {
  emit('deleteGame', props.game.id);
};

const handleSelect = () => {
  emit('selectGame', props.game);
};

const getStatusTranslation = (status: GameStatus) => {
  switch (status) {
    case GameStatus.Active:
      return 'Active';
    case GameStatus.Finished:
      return 'Finished';
    case GameStatus.Defeated:
      return 'Defeated';
    default:
  }
};

const getStatusColor = (status: GameStatus) => {
  switch (status) {
    case GameStatus.Active:
      return 'primary';
    case GameStatus.Finished:
      return 'orange';
    case GameStatus.Defeated:
      return 'red';
    default:
      return 'indigo';
  }
};
</script>

<template>
  <UCard
    class="min-h-32"
    :class="isSelected ? 'ring-gray-300 dark:ring-gray-70' : '' "
  >
    <template #header>
      <div class="flex justify-between">
        Turn {{ game.turn }} : {{ getDateFromTurnNumber(game.turn) }}
        <u-badge
          :label="getStatusTranslation(game.status)"
          :color="getStatusColor(game.status)"
        />
      </div>
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
