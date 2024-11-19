<script setup lang="ts">
import { useRoute } from 'vue-router'
import {useUserStore} from "../store/user.store";
const userStore = useUserStore();

const links = [
  {
    label: 'Login',
    icon: 'i-heroicons-user',
    to: '/login',
  },
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    disabled: !userStore.hasConnectedUser
  },
  {
    label: 'Gege',
    icon: 'i-heroicons-home',
    to: '/egeg',
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
