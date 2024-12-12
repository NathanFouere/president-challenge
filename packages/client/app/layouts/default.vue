<script setup lang="ts">
import { useUserStore } from '../store/user/user.store';
import { NUXT_ROUTES } from '../../config/routes/nuxt-routes';
import { useGameStore } from '../store/game/game.store';
import { usePageTitle } from '../composables/usePageTitle';
import { useGlobalLoader } from '../composables/useGlobalLoader';

const userStore = useUserStore();
const gameStore = useGameStore();
const pageTitle = usePageTitle();
const globalLoader = useGlobalLoader();
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
    label: 'Turn Informations',
    icon: 'i-heroicons-calendar',
    to: NUXT_ROUTES.turnInformations,
    disabled: !hasUser.value || !hasSelectedGame.value,
  },
  {
    label: 'Political Parties',
    icon: 'i-heroicons-building-library',
    to: NUXT_ROUTES.politicalParties,
    disabled: !hasUser.value || !hasSelectedGame.value,
  },
]);
</script>

<template>
  <UDashboardLayout class="w-full">
    <UDashboardPanel
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

    <UDashboardPage class="overflow-auto flex-1">
      <UDashboardPanel class="flex flex-1 pl-5 pr-5">
        <UDashboardNavbar :title="pageTitle.title.value" />
        <UProgress :class="{ 'opacity-0': !globalLoader.loading.value }" />
        <NuxtPage class="pt-6" />

        <UNotifications />
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardLayout>
</template>
