<script setup lang="ts">
import container from "../config/container";
import type {AuthPresenter} from "../presenters/auth.presenter";
import {COMMON_DEPENDANCY_TYPES} from "../config/common.types";

const authPresenter = container.get<AuthPresenter>(COMMON_DEPENDANCY_TYPES.AuthPresenter);

const logout = async () => {
  await authPresenter.logout();
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
      iconClass: authPresenter.logoutStore.isLoggingOut ? 'animate-spin' : '',
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
          :label="authPresenter.userStore.user!.fullName"
          :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
      </UButton>
    </template>
    <template #account>
      <div class="text-left">
        <p>
          Signed in as {{ authPresenter.userStore.user!.fullName }}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ authPresenter.userStore.user!.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>