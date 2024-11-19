<script setup lang="ts">
import {useUserStore} from "../store/user.store";
import {useUserSignupStore} from "../store/user-signup.store";

const userStore = useUserStore();
const signupStore = useUserSignupStore();
const { $api } = useNuxtApp();

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
  signupStore.setIsRegistering()
  try {
    const user = await $api.auth.signup(data.email, data.fullName, data.password);
    userStore.setUser(user);
  }
  catch (error) {
    console.error(error);
  }
  signupStore.unsetIsRegistering();
}
</script>

<template>
  <p v-if="userStore.user">{{ userStore.user }} logged</p>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
        :fields="fields"
        :validate="validate"
        align="top"
        title="Create an account"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        :submit-button="{ label: 'Create account' }"
        :loading="signupStore.getIsRegistering"
        @submit="onSubmit"
    >
      <template #description>
        Already have an account?
        <NuxtLink to="/login" class="text-primary font-medium">Login</NuxtLink>.
      </template>

      <template #footer>
        By signing up, you agree to our
        <NuxtLink to="/" class="text-primary font-medium">Terms of Service</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
