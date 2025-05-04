<script setup lang="ts">
import container from '~~/config/container';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { GamePresenter } from '~/presenters/game.presenter';

defineProps<{
  disabled: boolean;
}>();

const gamePresenter = container.get<GamePresenter>(COMMON_DEPENDANCY_TYPES.GamePresenter);

const isOpen = ref(false);

watch(
  () => isOpen.value,
  async () => {
    await gamePresenter.getGameDefinitions();
  },
);
</script>

<template>
  <UButton
    label="Create Game"
    :disabled="disabled"
    :loading="gamePresenter.gameStore.isCreatingGame"
    @click="isOpen = true"
  />

  <UModal
    v-model="isOpen"
    :ui="{ width: 'md:max-w-4xl' }"
  >
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          header
          <UIcon
            name="i-heroicons-x-mark"
            @click="isOpen = false"
          />
        </div>
      </template>
      <template #default>
        <game-definition-component
          v-for="(gameDefinition) in gamePresenter.gameDefinitionStore.getGameDefinitions"
          :key="gameDefinition.identifier"
          class="mb-5"
          :game-definition="gameDefinition"
        />
      </template>
    </UCard>
  </UModal>
</template>
