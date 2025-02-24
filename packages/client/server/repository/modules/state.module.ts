import type { StateDto } from '@shared/state/state-dto';
import type { BudgetDto } from '@shared/state/budget-dto';
import FetchFactory from '../factory';
import Routes from '~~/server/repository/routes.client';

class StateModule extends FetchFactory {
  private readonly RESOURCE = Routes.State;

  public async getState(gameId: number): Promise<StateDto> {
    return this.call<StateDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetState(gameId)}`,
      },
    );
  };

  public async getBudget(budgetId: number): Promise<BudgetDto> {
    return this.call<BudgetDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetBudget(budgetId)}`,
      },
    );
  }
}

export default StateModule;
