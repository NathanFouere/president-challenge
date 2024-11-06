<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types';
const schema = z.object({
  email: z.string().email('Invalid email'),
  fullName: z.string().min(2, 'Must be at least 2 characters'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  fullName: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const response = await $fetch('http://localhost:3333/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: event.data,
    });
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Fullname" name="fullname">
      <UInput v-model="state.fullName" />
    </UFormGroup>


    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>