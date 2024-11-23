<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useUserStore } from '../store/user.store';
import { NUXT_ROUTES } from '../config/routes/nuxt-routes';

const userStore = useUserStore();
const hasUser = computed(() => userStore.hasConnectedUser);
const links = [
  {
    label: 'Login',
    icon: 'i-heroicons-user',
    to: NUXT_ROUTES.login,
    disabled: hasUser,
  },
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: NUXT_ROUTES.home,
    disabled: !hasUser.value,
  },
];

const route = useRoute();

const activeLink = computed(() => {
  const routeName = route.name as string;
  return routeName.split('-').map((word, index) => index === 0 ? '' : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
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
        <NuxtPage />
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardLayout>
</template>
