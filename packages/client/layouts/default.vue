<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useUserStore } from '../store/user/user.store';
import { NUXT_ROUTES } from '../config/routes/nuxt-routes';

const userStore = useUserStore();
const hasUser = computed(() => userStore.hasConnectedUser);
const links = [
  {
    label: 'Games',
    icon: 'i-heroicons-archive-box',
    to: NUXT_ROUTES.games,
    disabled: !hasUser.value,
  },
];

const route = useRoute();

const activeLink = computed(() => {
  const routeName = route.name as string;
  return routeName.includes('-')
    ? routeName
      .split('-')
      .slice(1) // Ignore le premier mot
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
    : routeName.charAt(0).toUpperCase() + routeName.slice(1).toLowerCase();
});
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
        <UDashboardNavbar :title="activeLink" />
        <UContainer class="pt-5 w-full">
          <NuxtPage />

          <UNotifications />
        </UContainer>
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardLayout>
</template>
