import { useTurnInformationsStore } from '~/store/turn-informations/turn-informations.store';
import { useEventsStore } from '~/store/events/events.store';
import { useBudgetStore } from '~/store/budget/budget.store';
import { usePoliticalPartyStore } from '~/store/political-party/political-party.store';
import { useLawStore } from '~/store/legislature/law.store';
import { useLawCategoriesStore } from '~/store/legislature/law-categories.store';
import { useParliamentStore } from '~/store/legislature/parliament.store';
import { useSenateStore } from '~/store/legislature/senate.store';
import { useSocialClassesStore } from '~/store/social-class/social-classes.store';
import { useSocialClassStore } from '~/store/social-class/social-class.store';

export const useClearStore = () => {
  const clear = () => {
    useTurnInformationsStore().$reset();
    useEventsStore().$reset();
    useBudgetStore().$reset();
    usePoliticalPartyStore().$reset();
    useLawStore().$reset();
    useLawCategoriesStore().$reset();
    useParliamentStore().$reset();
    useSenateStore().$reset();
    useSocialClassesStore().$reset();
    useSocialClassStore().$reset();
  };

  return {
    clear,
  };
};
