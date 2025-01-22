import type { BudgetDto } from '@shared/state/budget-dto';

export const useBudgetStore = defineStore('budgetStore', {
  state: () => ({
    budget: null as BudgetDto | null,
    gettingBudget: false,
    errorOnGetBudget: false,
  }),
  getters: {
    getBudget: state => state.budget,
    isGettingBudget: state => state.gettingBudget,
    hasErrorOnGetBudget: state => state.errorOnGetBudget,
    hasBudget: state => state.budget !== null,
    requireBudget(state): BudgetDto {
      if (!state.budget) {
        throw new Error('Budget is not set');
      }
      return state.budget;
    },
  },
  actions: {
    setBudget(state: BudgetDto) {
      this.budget = state;
    },
    setIsGettingBudget() {
      this.gettingBudget = true;
    },
    unsetIsGettingBudget() {
      this.gettingBudget = false;
    },
    setErrorOnGetBudget() {
      this.errorOnGetBudget = true;
    },
    unsetErrorOnGetBudget() {
      this.errorOnGetBudget = false;
    },
  },
});
