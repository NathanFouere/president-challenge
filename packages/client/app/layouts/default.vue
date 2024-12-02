<script setup lang="ts">
import { useUserStore } from '../store/user/user.store';
import { NUXT_ROUTES } from '../../config/routes/nuxt-routes';
import { useGameStore } from '../store/game/game.store';
import { usePageTitle } from '../composables/usePageTitle';

const userStore = useUserStore();
const gameStore = useGameStore();
const pageTitle = usePageTitle();
const hasUser = computed(() => userStore.hasConnectedUser);
const hasSelectedGame = computed(() => gameStore.hasSelectedGame);

const links = computed(() => [
  {
    label: 'Games',
    icon: 'i-heroicons-archive-box',
    to: NUXT_ROUTES.games,
    disabled: !hasUser.value,
  },
  {
    label: 'Political Parties',
    icon: 'i-heroicons-building-library',
    to: NUXT_ROUTES.politicalParties,
    disabled: !hasSelectedGame.value,
  },
]);
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardSidebar>
        <template #header>
          <UDashboardSidebarLinks :links="links" />
        </template>
        <UDivider class="sticky bottom-0" />
        <template #footer>
          <UserDropdown v-if="userStore.connectedUser" />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <UDashboardPage class="flex flex-1 w-full">
      <UDashboardPanel class="flex flex-1 w-full">
        <UDashboardNavbar :title="pageTitle.title.value" />
        <UContainer class="pt-5 w-full">
          <NuxtPage />

          <UNotifications />
        </UContainer>
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardLayout>
</template>
