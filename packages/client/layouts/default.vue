<script setup lang="ts">
import { useRoute } from 'vue-router'
import {useUserStore} from "../store/user.store";
import {ROUTES} from "../config/routes";
const userStore = useUserStore();

const links = [
  {
    label: 'Login',
    icon: 'i-heroicons-user',
    to: ROUTES.login,
  },
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: ROUTES.home,
    disabled: !userStore.hasConnectedUser
  }
]

const route = useRoute()

const activeLink = computed(() => {
  return links.find(link => link.to === route.path) || { label: 'Unknown' }
})
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
          <UserDropdown v-if="userStore.connectedUser"/>
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <UDashboardPage class="flex flex-1 w-full">
      <UDashboardPanel class="flex flex-1 w-full">
        <UDashboardNavbar :title="activeLink.label" />
        <NuxtPage />
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardLayout>
</template>
