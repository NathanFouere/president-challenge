<script setup lang="ts">
import container from '../../../config/container';
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import type { StatePresenter } from '../../presenters/state/state.presenter';

usePageTitle().setTitle('State');

const statePresenter = container.get<StatePresenter>(COMMON_DEPENDANCY_TYPES.StatePresenter);

onMounted(async () => {
  await statePresenter.getState();
});
</script>

<template>
  <div>
    <state-component
      :state="statePresenter.stateStore.getState"
    />
  </div>
</template>
