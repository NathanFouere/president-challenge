<script setup lang="ts">
import container from '../../../config/container';
import type { PoliticalPartiesPresenter } from '../../presenters/political-party/political-parties.presenter';
import SenateComponent from '../../components/legislation/senate-component.vue';
import ParliamentComponent from '../../components/legislation/parliament-component.vue';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import { NUXT_ROUTES } from '~~/config/routes/nuxt-routes';

const router = useRouter();

usePageTitle().setTitle('Legislation');

const politicalPartiesPresenter = container.get<PoliticalPartiesPresenter>(COMMON_DEPENDANCY_TYPES.PoliticalPartiesPresenter);

onMounted(async () => {
  await politicalPartiesPresenter.getPoliticalParties();
});
</script>

<template>
  <div>
    <br>
    <h1 class="text-center">
      Political Parties
    </h1>
    <br>
    <USkeleton
      v-if="politicalPartiesPresenter.politicalPartiesStore.isGettingPoliticalParties"
      class="w-full h-64 "
    />
    <div
      v-else
      class="grid grid-cols-6 gap-4"
    >
      <political-party-component
        v-for="(politicalParty) in politicalPartiesPresenter.politicalPartiesStore.getPoliticalParties"
        :key="politicalParty.id"
        :minimal-political-party="politicalParty"
      />
    </div>
  </div>
  <br>
  <UDivider class="sticky" />
  <br>
  <div class="text-center">
    <h1 class="text-center">
      Legislature
    </h1>
    <br>
    <div class="flex flex-1 items-center ">
      <senate-component class="w-1/2 p-1" />
      <parliament-component class="w-1/2 p-1" />
    </div>
    <br>
    <UButton
      @click="() => router.push(NUXT_ROUTES.laws)"
    >
      Laws
    </UButton>
  </div>
</template>
