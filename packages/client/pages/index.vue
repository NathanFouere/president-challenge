<script setup lang="ts">
import type { Game } from '@shared/typesgame/game';
import { COMMON_DEPENDANCY_TYPES } from '../config/common.types';
import container from '../config/container';
import type { GamePresenter } from '../presenters/game.presenter';

const gamePresenter = container.get<GamePresenter>(COMMON_DEPENDANCY_TYPES.GamePresenter);

const games = ref<Game[]>([]);
onMounted(async () => {
  games.value = await gamePresenter.getUserGames();
});
</script>

<template>
  <UContainer>
    {{ games }}
  </UContainer>
</template>
