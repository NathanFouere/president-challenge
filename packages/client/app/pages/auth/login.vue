<script setup lang="ts">
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import container from '../../../config/container';
import type { AuthPresenter } from '../../presenters/auth.presenter';

const authPresenter = container.get<AuthPresenter>(COMMON_DEPENDANCY_TYPES.AuthPresenter);

const fields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
];

const validate = (state: any) => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' });
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' });
  return errors;
};

async function onSubmit(data: any) {
  await authPresenter.login(data.email, data.password);
}

async function signOut() {
  await authPresenter.logout();
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UCard v-if="authPresenter.userStore.connectedUser">
      <p>
        Already logged in as {{ authPresenter.userStore.connectedUser.email }} <UButton @click="signOut">
          Sign out
        </UButton>
      </p>
    </UCard>

    <UAuthForm
      v-else
      :fields="fields"
      :validate="validate"
      title="Login"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :loading="authPresenter.loginStore.getIsLogging"
      :submit-button="{ label: 'Login' }"
      @submit="onSubmit"
    >
      <template #description>
        <p>
          Don't have an account? <NuxtLink
            :to="NUXT_ROUTES.signup"
            class="text-primary font-medium"
          >
            Sign up
          </NuxtLink>.
        </p>
      </template>

      <template
        v-if="authPresenter.loginStore.getError"
        #validation
      >
        <UAlert
          color="red"
          icon="i-heroicons-information-circle-20-solid"
          :title="authPresenter.loginStore.getError"
        />
      </template>
    </UAuthForm>
  </UCard>
</template>
