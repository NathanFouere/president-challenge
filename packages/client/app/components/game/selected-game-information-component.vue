<script setup lang="ts">
import type { GameDto } from '@shared/game/game-dto';
import { getDateFromTurnNumber } from '@shared/utils/date-converter';

defineProps<{
  game: GameDto;
}>();
</script>

<template>
  <p>Date : {{ getDateFromTurnNumber(game.turn) }}</p>
  <p>|</p>
  <p>Political Weight : {{ game.politicalWeight }}</p>
  <p>|</p>
</template>
