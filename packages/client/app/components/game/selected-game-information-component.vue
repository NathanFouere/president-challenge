<script setup lang="ts">
import type { GameDto } from '@president-challenge/shared/dist/game/game-dto';
import { getDateFromTurnNumber } from '@president-challenge/shared/dist/utils/date-converter';

defineProps<{
  game: GameDto;
}>();
</script>

<template>
  <p>Date : {{ getDateFromTurnNumber(game.turn) }}</p>
  <p>|</p>
  <p>Political Weight : {{ game.politicalWeight }}</p>
</template>
