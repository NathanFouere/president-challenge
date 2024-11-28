<script setup lang="ts">
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import container from '../../../config/container';
import type { PoliticalPartyPresenter } from '../../presenters/political-party/political-party.presenter';

usePageTitle().setTitle('Political party ...');

const route = useRoute();
const id = Number(route.params.id);
const politicalPartyPresenter = container.get<PoliticalPartyPresenter>(COMMON_DEPENDANCY_TYPES.PoliticalPartyPresenter);

onMounted(async () => {
  await politicalPartyPresenter.getPoliticalParty(id);
});
</script>

<template>
  <div>
    <h1>{{ politicalPartyPresenter.politicalPartyStore.getPoliticalParty }}</h1>
  </div>
</template>
