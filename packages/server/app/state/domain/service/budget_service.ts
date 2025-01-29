import { inject } from '@adonisjs/core';
import type State from '#state/domain/model/state';

@inject()
export default class BudgetService {
  public updateStateFinancesFromBudgets(state: State, turn: number): void {
    const financialFlows = state.applyBudgets(turn);
    state.financialFlows.push(...financialFlows);
  }
}
