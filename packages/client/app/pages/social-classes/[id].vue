<script setup lang="ts">
import type { SocialClassPresenter } from '../../presenters/social-class/social-class.presenter';
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import container from '../../../config/container';
import LicensedFilesComponent from '../../components/common/licensed-files-component.vue';

const route = useRoute();
const id = Number(route.params.id);

const socialClassPresenter = container.get<SocialClassPresenter>(COMMON_DEPENDANCY_TYPES.SocialClassPresenter);

onMounted(async () => {
  await socialClassPresenter.getSocialClass(id);
});
</script>

<template>
  <USkeleton
    v-if="socialClassPresenter.socialClassStore.isGettingSocialClass"
    class="w-full h-64"
  />
  <div
    v-else-if="socialClassPresenter.socialClassStore.hasSocialClass"
    class="text-center"
  >
    <h1>Type : {{ socialClassPresenter.socialClassStore.requireSocialClass.name }}</h1>
    <br>
    <div class="flex justify-center items-center">
      <licensed-files-component
        class="w-3/12"
        :licensed-files="socialClassPresenter.socialClassStore.requireSocialClass.licensedFiles"
      />
    </div>
    <br>
    <p>Description : {{ socialClassPresenter.socialClassStore.requireSocialClass.description }}</p>
    <br>
    <p>Wealth Level : {{ socialClassPresenter.socialClassStore.requireSocialClass.wealthLevel }}</p>
  </div>
</template>
