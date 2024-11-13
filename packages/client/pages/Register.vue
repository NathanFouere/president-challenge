<script setup lang="ts">
import { reactive, ref } from 'vue';
import { z } from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';

const isRegisterMode = ref(true); // Définit le mode par défaut sur "register"

// Schéma de validation pour l'inscription
const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  fullName: z.string().min(2, 'Must be at least 2 characters'),
  password: z.string().min(8, 'Must be at least 8 characters')
});

// Schéma de validation pour la connexion
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
});

type RegisterSchema = z.output<typeof registerSchema>;
type LoginSchema = z.output<typeof loginSchema>;

// État pour les deux formulaires
const state = reactive({
  email: undefined,
  fullName: undefined,
  password: undefined
});

// Fonction de soumission
async function onSubmit(event: FormSubmitEvent<RegisterSchema | LoginSchema>) {
  try {
    const endpoint = isRegisterMode.value ? 'register' : 'login';
    console.log(endpoint)
    const response = await $fetch(`http://localhost:3333/${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: event.data,
    });

    if (!isRegisterMode.value) {
      const response = await $fetch('http://localhost:3333/dashboard', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour basculer entre les formulaires
function toggleMode() {
  isRegisterMode.value = !isRegisterMode.value;
}
</script>

<template>
  <div class="auth-form">
    <UForm :schema="isRegisterMode ? registerSchema : loginSchema" :state="state" class="space-y-4" @submit="onSubmit">

      <!-- Champ Email commun aux deux formulaires -->
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <!-- Champ FullName seulement pour l'inscription -->
      <UFormGroup v-if="isRegisterMode" label="Full Name" name="fullName">
        <UInput v-model="state.fullName" />
      </UFormGroup>

      <!-- Champ Password commun aux deux formulaires -->
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit">
        {{ isRegisterMode ? 'Register' : 'Login' }}
      </UButton>
    </UForm>

    <!-- Bouton pour basculer entre inscription et connexion -->
    <UButton @click="toggleMode" variant="text">
      {{ isRegisterMode ? 'Already have an account? Login' : "Don't have an account? Register" }}
    </UButton>
  </div>
</template>
