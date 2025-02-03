<script setup lang="ts">
import { useUserStore } from '~/store/user/user.store';
import { NUXT_ROUTES } from '~~/config/routes/nuxt-routes';
import { useGameStore } from '~/store/game/game.store';
import { usePageTitle } from '~/composables/usePageTitle';
import SelectedGameInformationComponent from '~/components/game/selected-game-information-component.vue';

const userStore = useUserStore();
const gameStore = useGameStore();
const pageTitle = usePageTitle();
const hasUser = computed(() => userStore.hasConnectedUser);
const hasSelectedGame = computed(() => gameStore.hasSelectedGame);
const router = useRouter();

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
    label: 'State',
    icon: 'i-heroicons-building-storefront',
    to: NUXT_ROUTES.state,
    disabled: !hasUser.value || !hasSelectedGame.value,
  },
  {
    label: 'Politics',
    icon: 'i-heroicons-building-library',
    to: NUXT_ROUTES.politics,
    disabled: !hasUser.value || !hasSelectedGame.value,
  },
  {
    label: 'Social Classes',
    icon: 'i-heroicons-user-group',
    to: NUXT_ROUTES.socialClasses,
    disabled: !hasUser.value || !hasSelectedGame.value,
  },
  {
    label: 'Products',
    icon: 'i-heroicons-building-storefront',
    to: NUXT_ROUTES.products,
    disabled: !hasUser.value || !hasSelectedGame.value,
  },
  {
    label: 'Sectors',
    icon: 'i-heroicons-currency-dollar',
    to: NUXT_ROUTES.sectors,
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
      <UDashboardPanel class="flex flex-1">
        <UDashboardNavbar>
          <template #left>
            {{ pageTitle.title.value }}
          </template>
          <template #right>
            <selected-game-information-component
              v-if="gameStore.hasSelectedGame"
              :game="gameStore.requireSelectedGame"
            />
            <UIcon
              class="h-5 w-5 mt-0.5 "
              name="i-heroicons-arrow-turn-down-left"
              @click="() => router.go(-1)"
            />
          </template>
        </UDashboardNavbar>
        <div class="p-2.5">
          <NuxtPage />
        </div>
        <UNotifications />
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardLayout>
</template>
