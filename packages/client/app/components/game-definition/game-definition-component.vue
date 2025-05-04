<script setup lang="ts">
import type { GameDefinitionDto } from '@president-challenge/shared/dist/game/game-definition-dto';
import LicensedFileComponent from '~/components/common/licensed-file-component.vue';
import container from '~~/config/container';
import type { GamePresenter } from '~/presenters/game.presenter';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';

defineProps<{
  gameDefinition: GameDefinitionDto;
}>();

const gamePresenter = container.get<GamePresenter>(COMMON_DEPENDANCY_TYPES.GamePresenter);
</script>

<template>
  <UCard>
    <template #header>
      {{ gameDefinition.name }}
    </template>

    <p>{{ gameDefinition.description }}</p>
    <LicensedFileComponent :licensed-file="gameDefinition.logo" />
    <UButton
      :loading="gamePresenter.gameDefinitionStore?.getCreatingGameDefinitionIdentifier === gameDefinition.identifier"
      @click="gamePresenter.createGame(gameDefinition.identifier)"
    >
      Create Game
    </UButton>
  </UCard>
</template>
