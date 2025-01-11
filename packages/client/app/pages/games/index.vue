<script setup lang="ts">
import type { Game } from '@shared/dist/game/game';
import container from '../../../config/container';
import type { GamePresenter } from '~/presenters/game.presenter';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';

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
  <template
    v-for="(game) in gamePresenter.gameStore.userGames"
    v-else
    :key="game.id"
  >
    <game-component
      :game="game"
      :is-selected="gamePresenter.gameStore.selectedGame?.id === game.id"
      :pending-deletion="gamePresenter.gameStore.gamePendingDeletionId === game.id"
      class="mb-3"
      @select-game="(selectedGame: Game) => gamePresenter.selectGame(selectedGame)"
      @delete-game="(deletedGameId) => gamePresenter.deleteGame(deletedGameId)"
    />
  </template>
  <div
    class="float-end"
  >
    <UTooltip
      v-if="gamePresenter.hasMaxGames()"
      class="float-end"
      text="Maximum number of games reached (3)"
    >
      <UButton
        label="Create new Game"
        disabled
      />
    </UTooltip>
    <UButton
      v-else
      class="float-end"
      :loading="gamePresenter.gameStore.isCreatingGame"
      label="Create new Game"
      @click="gamePresenter.createGame()"
    />
  </div>
</template>
