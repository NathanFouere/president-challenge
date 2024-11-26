export const useCustomToast = () => {
  const toast = useToast();

  const showSuccess = (title: string) => {
    toast.add({
      title,
      color: 'green',
    });
  };

  const showError = (title: string) => {
    toast.add({
      title,
      color: 'red',
    });
  };

  const showInfo = (title: string) => {
    toast.add({
      title,
      color: 'green',
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
  };
};
