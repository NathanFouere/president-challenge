<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  isPendingDeletion: boolean;
}>();

const emit = defineEmits<{
  (event: 'confirmDeletion'): void;
}>();

const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};

const handleDelete = () => {
  emit('confirmDeletion');
};
</script>

<template>
  <UButton
    label="Delete"
    :loading="isPendingDeletion"
    @click="isOpen = true"
  />

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <p>Confirm Deletion</p>
      </template>

      <p>Are you sure you want to delete</p>

      <template #footer>
        <div class="flex justify-between items-center">
          <UButton
            label="Cancel"
            @click="closeModal"
          />

          <UButton
            label="Confirm"
            :loading="isPendingDeletion"
            @click="handleDelete"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
