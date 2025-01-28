import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateFinancialFlowRepository from '#state/domain/repository/i_state_financial_flow_repository';
import { aStateFinancialFlow } from '#state/application/builder/state_financial_flow_builder';
import type Budget from '#state/domain/model/budget';
import type State from '#state/domain/model/state';
import type StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';

@inject()
export default class BudgetService {
  constructor(
    private readonly financialFlowRepository: IStateFinancialFlowRepository,
  ) {
  }

  public async updateStateFinancesFromBudgets(budgets: Budget[], state: State, stateTurnFinancialFlows: StateTurnFinancialFlows): Promise<void> {
    let totalBudgetsCosts = 0;
    const financialFlows = [];
    for (const budget of budgets) {
      totalBudgetsCosts -= budget.level;
      financialFlows.push(aStateFinancialFlow()
        .withStateFinancialFlowId(stateTurnFinancialFlows.id)
        .withAmount(-budget.level)
        .withColor(budget.color)
        .withName(budget.name)
        .build(),
      );
    }
    await this.financialFlowRepository.createMany(financialFlows);
    state.addToEconomicalSituation(totalBudgetsCosts);
  }
}
