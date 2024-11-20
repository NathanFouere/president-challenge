<script setup lang="ts">
import {useUserStore} from "../store/user.store";
import {userUserDropdownStore} from "../store/user-dropdown.store";

const userStore = useUserStore();
const userDropdownStore = userUserDropdownStore();
const { $api }  = useNuxtApp()


const logout = async () => {
  userDropdownStore.setLoggingOut();
  try {
    await $api.auth.logout();
    userStore.unsetUser();
  } catch (error) {
    console.error("Error signing out:", error);
  } finally {
    userDropdownStore.unsetLoggingOut();
  }
};

const items = computed(() => [
  [
    {
      slot: 'account',
      label: '',
      disabled: true
    }
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      iconClass: userDropdownStore.isLoggingOut ? 'animate-spin' : '',
      click: logout
    },
  ]
])

</script>

<template>
  <UDropdown
      mode="hover"
      :items="items"
      :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
      :popper="{ strategy: 'absolute', placement: 'top' }"
      class="w-full"
  >
    <template #default="{ open }">
      <UButton
          color="gray"
          variant="ghost"
          class="w-full"
          :label="userStore.user!.fullName"
          :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
      </UButton>
    </template>
    <template #account>
      <div class="text-left">
        <p>
          Signed in as {{ userStore.user!.fullName }}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ userStore.user!.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>