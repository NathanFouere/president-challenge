import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateFinancialFlowRepository from '#state/domain/repository/i_state_financial_flow_repository';
import type State from '#state/domain/model/state';

@inject()
export default class BudgetService {
  constructor(
    private readonly financialFlowRepository: IStateFinancialFlowRepository,
  ) {
  }

  public async updateStateFinancesFromBudgets(state: State, turn: number): Promise<void> {
    const financialFlows = state.applyBudgets(turn);

    await this.financialFlowRepository.createMany(financialFlows);
  }
}
