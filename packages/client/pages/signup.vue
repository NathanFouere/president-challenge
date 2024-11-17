<script setup lang="ts">
import {useUserStore} from "../store/user.store";

definePageMeta({
  layout: 'auth'
});

useSeoMeta({
  title: 'Sign up'
});

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
const store = useUserStore();

async function onSubmit(data: any) {
  try {
    await store.registerUser(data.email, data.fullName, data.password);
  }
  catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <p v-if="store.user">{{store.user}} logged</p>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur" v-if="!store.user">
    <UAuthForm
        :fields="fields"
        :validate="validate"
        align="top"
        title="Create an account"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        :submit-button="{ label: 'Create account' }"
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
