import { inject } from '@adonisjs/core';
import type Sector from '#sector/domain/model/sector';
import type State from '#state/domain/model/state';
import { aStateTurnFinancialFlows } from '#state/application/builder/state_turn_financial_flows_builder';
import type FinancialFlow from '#state/domain/model/financial_flow';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SectorFinancialFlowService from '#state/domain/service/sector_financial_flow_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import BudgetFinancialFlowService from '#state/domain/service/budget_financial_flow_service';

@inject()
export default class StateTurnFinancialFlowService {
  constructor(
    private readonly sectorFinancialFlowService: SectorFinancialFlowService,
    private readonly budgetFinancialFlowService: BudgetFinancialFlowService,
  ) {
  }

  public async createStateTurnFinancialFlow(sectors: Sector[], state: State, turn: number): Promise<void> {
    const stateTurnFinancialFlows = await aStateTurnFinancialFlows()
      .withTurn(turn)
      .withStateId(state.id)
      .exist();

    const financialFlows = [];
    financialFlows.push(await this.sectorFinancialFlowService.createSectorsRevenuesFinancialFlows(sectors, state, stateTurnFinancialFlows));
    financialFlows.push(...await this.budgetFinancialFlowService.createBudgetFinancialFlows(state.budgets, state, stateTurnFinancialFlows));

    const totalRevenue = financialFlows.reduce((acc: number, flow: FinancialFlow) => acc + flow.amount, 0);
    state.addToEconomicalSituation(totalRevenue);
  }
}
