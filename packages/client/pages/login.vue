<script setup lang="ts">
import {useUserStore} from "../store/user.store";
import {useUserLoginStore} from "../store/user-login.store";

const userStore = useUserStore();
const loginStore = useUserLoginStore();
const { $api } = useNuxtApp();

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
  loginStore.setLogging()
  try {
    const user = await $api.auth.login(data.email, data.password);
    userStore.setUser(user);
    loginStore.unsetLogging()
  }
  catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <p v-if="userStore.connectedUser">{{ userStore.connectedUser }} logged</p>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
        :fields="fields"
        :validate="validate"
        align="top"
        title="Login"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        :loading="loginStore.getIsLogging"
        :submit-button="{ label: 'Login' }"
        @submit="onSubmit"
    >
      <template #description>
        Don't have an account?
        <NuxtLink to="/signup" class="text-primary font-medium">Sign up</NuxtLink>.
      </template>

      <template #footer>
        By logging in, you agree to our
        <NuxtLink to="/" class="text-primary font-medium">Terms of Service</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
