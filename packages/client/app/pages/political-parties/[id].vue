<script setup lang="ts">
import container from '../../../config/container';
import LicensedFileComponent from '../../components/common/licensed-file-component.vue';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type { PoliticalPartyPresenter } from '~/presenters/political-party/political-party.presenter';
import LineChartComponent from '~/components/common/charts/line-chart-component.vue';

usePageTitle().setTitle('Political party ...');

const route = useRoute();
const id = Number(route.params.id);
const politicalPartyPresenter = container.get<PoliticalPartyPresenter>(COMMON_DEPENDANCY_TYPES.PoliticalPartyPresenter);

onMounted(async () => {
  await politicalPartyPresenter.getPoliticalParty(id);
  if (politicalPartyPresenter.politicalPartyStore.getPoliticalParty) {
    usePageTitle().setTitle(politicalPartyPresenter.politicalPartyStore.getPoliticalParty.name);
  }
});
</script>

<template>
  <USkeleton
    v-if="politicalPartyPresenter.politicalPartyStore.isGettingPoliticalParty"
    class="w-full h-1/2 mb-3"
  />

  <div
    v-if="!politicalPartyPresenter.politicalPartyStore.isGettingPoliticalParty && politicalPartyPresenter.politicalPartyStore.getPoliticalParty"
    class="text-center"
  >
    <h1 class="font-bold">
      {{ politicalPartyPresenter.politicalPartyStore.getPoliticalParty.name }}
      <i>( {{ politicalPartyPresenter.politicalPartyStore.getPoliticalParty.affiliation }})</i>
    </h1>
    <p>
      <b>{{ politicalPartyPresenter.politicalPartyStore.getPoliticalParty.inPower ? 'In government' : 'In the opposition' }}</b>
    </p>
    <div class="flex justify-center items-center">
      <licensed-file-component
        :licensed-file="politicalPartyPresenter.politicalPartyStore.getPoliticalParty.licensedFile"
      />
    </div>
    <p class="text-justify">
      Description : {{ politicalPartyPresenter.politicalPartyStore.getPoliticalParty.description }}
    </p>

    <UDivider class="sticky pt-10 pb-10" />

    <h1 class="font-bold">
      Happiness
    </h1>
    <p>Happiness level : {{ politicalPartyPresenter.politicalPartyStore.getPoliticalParty.happinessLevel }}</p>
    <happiness-modifier-component
      :happiness-modifiers="politicalPartyPresenter.politicalPartyStore.getPoliticalParty.happinessModifiers"
    />
    <br>
    <line-chart-component
      :data="politicalPartyPresenter.politicalPartyStore.getPoliticalParty.happinessPerMonthChartData"
    />
  </div>
</template>
