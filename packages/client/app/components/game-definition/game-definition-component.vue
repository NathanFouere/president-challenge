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
      <UBadge
        v-if="gameDefinition.inDevelopment"
        size="sm"
        icon="i-heroicons-x-mark"
        color="yellow"
        class="float-end"
        label="In Development"
      />
    </template>

    <LicensedFileComponent :licensed-file="gameDefinition.logo" />
    <UDivider class="sticky pt-5 pb-5" />

    <p>Description : {{ gameDefinition.description }}</p>
    <UButton
      class="mt-4"
      :loading="gamePresenter.gameDefinitionStore?.getCreatingGameDefinitionIdentifier === gameDefinition.identifier"
      :disabled="gameDefinition.inDevelopment"
      @click="gamePresenter.createGame(gameDefinition.identifier)"
    >
      Create Game
    </UButton>
  </UCard>
</template>
