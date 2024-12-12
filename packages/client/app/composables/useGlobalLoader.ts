import { ref } from 'vue';

const loading = ref(false);

export const useGlobalLoader = () => {
  const startLoading = () => {
    loading.value = true;
  };

  const stopLoading = () => {
    loading.value = false;
  };

  return {
    loading,
    startLoading,
    stopLoading,
  };
};
