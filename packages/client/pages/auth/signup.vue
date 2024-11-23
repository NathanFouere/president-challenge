<script setup lang="ts">
import container from '../../config/container';
import type { AuthPresenter } from '../../presenters/auth.presenter';
import { COMMON_DEPENDANCY_TYPES } from '../../config/common.types';
import { NUXT_ROUTES } from '../../config/routes/nuxt-routes';

const authPresenter = container.get<AuthPresenter>(COMMON_DEPENDANCY_TYPES.AuthPresenter);

const fields = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
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
  if (!state.fullName) errors.push({ path: 'name', message: 'Name is required' });
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' });
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' });
  return errors;
};

async function onSubmit(data: any) {
  await authPresenter.signup(data.email, data.fullName, data.password);
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      title="Create an account"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ label: 'Create account' }"
      :loading="authPresenter.signupStore.getIsRegistering"
      @submit="onSubmit"
    >
      <template #description>
        Already have an account?
        <NuxtLink
          :to="NUXT_ROUTES.login"
          class="text-primary font-medium"
        >
          Login
        </NuxtLink>.
      </template>

      <template
        v-if="authPresenter.signupStore.getError"
        #validation
      >
        <UAlert
          color="red"
          icon="i-heroicons-information-circle-20-solid"
          :title="authPresenter.signupStore.getError"
        />
      </template>

      <template #footer>
        By signing up, you agree to our
        <NuxtLink
          to="/packages/client/public"
          class="text-primary font-medium"
        >
          Terms of Service
        </NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
