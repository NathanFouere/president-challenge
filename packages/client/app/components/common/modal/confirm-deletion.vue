<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  isPendingDeletion: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (event: 'confirmDeletion'): void;
}>();

const isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue;
  },
);

const closeModal = () => {
  isOpen.value = false;
  emit('update:modelValue', false);
};

const handleDelete = () => {
  emit('confirmDeletion');
};
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <p>Confirm Deletion</p>
      </template>

      <p>Are you sure you want to delete this game?</p>

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
