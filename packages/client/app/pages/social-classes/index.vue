<script setup lang="ts">
import container from '../../../config/container';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { SocialClassesPresenter } from '~/presenters/social-class/social-classes.presenter';

usePageTitle().setTitle('Social Classes');

const socialClassesPresenter = container.get<SocialClassesPresenter>(COMMON_DEPENDANCY_TYPES.SocialClassesPresenter);

onMounted(async () => {
  await socialClassesPresenter.getSocialClasses();
});
</script>

<template>
  <div
    class="flex flex-wrap justify-center gap-4"
  >
    <USkeleton
      v-if="socialClassesPresenter.socialClassesStore.isGettingSocialClasses"
      class="w-full h-64"
    />
    <social-class-component
      v-for="(socialClass) in socialClassesPresenter.socialClassesStore.getSocialClasses"
      v-else
      :key="socialClass.id"
      class="w-1/4"
      :social-class="socialClass"
    />
  </div>
</template>
