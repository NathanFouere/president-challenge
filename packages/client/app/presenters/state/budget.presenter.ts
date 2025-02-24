import { injectable } from 'inversify';
import type StateModule from '~~/server/repository/modules/state.module';
import { useBudgetStore } from '~/store/budget/budget.store';

@injectable()
export class BudgetPresenter {
  private readonly stateModule: StateModule = useNuxtApp().$api.state;
  private readonly toast = useCustomToast();
  public readonly budgetStore = useBudgetStore();

  public async getBudget(budgetId: number): Promise<void> {
    this.budgetStore.setIsGettingBudget();
    try {
      const budget = await this.stateModule.getBudget(budgetId);
      this.budgetStore.setBudget(budget);
    }
    catch {
      this.budgetStore.setErrorOnGetBudget();
      this.toast.showError('Error fetching budget');
    }
    this.budgetStore.unsetIsGettingBudget();
  }
}
