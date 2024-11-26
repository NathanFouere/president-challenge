import container from '../../config/container';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      container,
    },
  };
});
