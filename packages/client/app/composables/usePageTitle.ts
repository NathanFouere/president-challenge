import { ref } from 'vue';

const title = ref('');

export const usePageTitle = () => {
  const setTitle = (newTitle: string) => {
    title.value = newTitle;
  };

  return {
    title,
    setTitle,
  };
};
