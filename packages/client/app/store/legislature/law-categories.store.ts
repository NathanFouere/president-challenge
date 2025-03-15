import type { LawCategoryDto } from '@president-challenge/shared/dist/legislature/law-category-dto';

export const useLawCategoriesStore = defineStore('lawCategoriesStore', {
  state: () => ({
    lawCategories: [] as LawCategoryDto[],
    gettingLawCategories: false,
  }),
  getters: {
    getLawCategories: state => state.lawCategories,
    hasLawCategories: state => state.lawCategories.length > 0,
    isGettingLawCategories: state => state.gettingLawCategories,
  },
  actions: {
    setLawCategories(lawCategories: LawCategoryDto[]) {
      this.lawCategories = lawCategories;
    },
    setIsGettingLawCategories() {
      this.gettingLawCategories = true;
    },
    unsetIsGettingLawCategories() {
      this.gettingLawCategories = false;
    },
  },
});
