<script setup lang="ts">
import container from "../../config/container";
import type {AuthPresenter} from "../../presenters/auth.presenter";
import {COMMON_DEPENDANCY_TYPES} from "../../config/common.types";
import {ROUTES} from "../../config/routes";

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
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
        :fields="fields"
        :validate="validate"
        title="Login"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        :loading="authPresenter.loginStore.getIsLogging"
        :submit-button="{ label: 'Login' }"
        @submit="onSubmit"
    >
      <template #description>
        Don't have an account?
        <NuxtLink :to="ROUTES.signup" class="text-primary font-medium">Sign up</NuxtLink>.
      </template>

      <template #validation v-if="authPresenter.loginStore.getError">
        <UAlert color="red" icon="i-heroicons-information-circle-20-solid" :title="authPresenter.loginStore.getError" />
      </template>
    </UAuthForm>
  </UCard>
</template>
