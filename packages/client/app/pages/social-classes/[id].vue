<script setup lang="ts">
import container from '../../../config/container';
import LicensedFilesComponent from '../../components/common/licensed-files-component.vue';
import type { SocialClassPresenter } from '~/presenters/social-class/social-class.presenter';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import LineChartComponent from '~/components/common/charts/line-chart-component.vue';
import FinancialFlowsComponent from '~/components/financial-flow/financial-flows-component.vue';

const route = useRoute();
const id = Number(route.params.id);

const socialClassPresenter = container.get<SocialClassPresenter>(COMMON_DEPENDANCY_TYPES.SocialClassPresenter);
usePageTitle().setTitle('Social Class : ...');

onMounted(async () => {
  await socialClassPresenter.getSocialClass(id);
  usePageTitle().setTitle('Social Class : ' + socialClassPresenter.socialClassStore.requireSocialClass.name);
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
    <p>Population : {{ socialClassPresenter.socialClassStore.requireSocialClass.population }}</p>
    <p>Description : {{ socialClassPresenter.socialClassStore.requireSocialClass.description }}</p>

    <UDivider class="sticky pt-10 pb-10" />

    <h1>Economical situation</h1>
    <p>Wealth Level : {{ socialClassPresenter.socialClassStore.requireSocialClass.economicalSituation }}</p>
    <br>
    <line-chart-component :data="socialClassPresenter.socialClassStore.requireSocialClass.economicalSituationPerMonthChartData" />

    <UDivider class="sticky pt-10 pb-10" />

    <h1>Happiness </h1>
    <p>Happiness Level : {{ socialClassPresenter.socialClassStore.requireSocialClass.happinessLevel }}</p>
    <happiness-modifier-component
      :happiness-modifiers="socialClassPresenter.socialClassStore.requireSocialClass.happinessModifiers"
    />
    <br>
    <line-chart-component
      :data="socialClassPresenter.socialClassStore.requireSocialClass.happinessPerMonthChartData"
    />

    <financial-flows-component
      :financial-flows-chart-datas="socialClassPresenter.socialClassStore.requireSocialClass.financialFlowDatas"
    />
  </div>
</template>
