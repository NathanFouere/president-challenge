<script setup lang="ts">
import type { MinimalGameDto } from '@president-challenge/shared/dist/game/minimal-game-dto';
import container from '../../../config/container';
import type { GamePresenter } from '~/presenters/game.presenter';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import CreateGameModal from '~/components/game/create-game-modal.vue';

usePageTitle().setTitle('List of your games');
const gamePresenter = container.get<GamePresenter>(COMMON_DEPENDANCY_TYPES.GamePresenter);

onMounted(async () => {
  await gamePresenter.getUserGames();
});
</script>

<template>
  <USkeleton
    v-if="gamePresenter.gameStore.isGettingGames"
    class="w-full h-64"
  />
  <game-component
    v-for="(game) in gamePresenter.gameStore.userGames"
    v-else
    :key="game.id"
    :game="game"
    :is-selected="gamePresenter.gameStore.selectedGame?.id === game.id"
    :pending-deletion="gamePresenter.gameStore.gamePendingDeletionId === game.id"
    :is-selecting-game="gamePresenter.gameStore.selectingGameId === game.id"
    class="mb-3"
    @select-game="(selectedGame: MinimalGameDto) => gamePresenter.selectGame(selectedGame)"
    @delete-game="(deletedGameId) => gamePresenter.deleteGame(deletedGameId)"
  />
  <div
    class="float-end"
  >
    <UTooltip
      v-if="gamePresenter.hasMaxGames()"
      class="float-end"
      text="Maximum number of games reached (3)"
    >
      <CreateGameModal
        disabled
      />
    </UTooltip>
    <CreateGameModal
      v-else
      :disabled="false"
      class="float-end"
    />
  </div>
</template>
