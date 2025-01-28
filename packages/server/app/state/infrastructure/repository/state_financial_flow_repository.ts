import type IStateFinancialFlowRepository from '#state/domain/repository/i_state_financial_flow_repository';
import StateFinancialFlow from '#state/domain/model/state_financial_flow';

export default class StateFinancialFlowRepository implements IStateFinancialFlowRepository {
  public async save(financialFlow: StateFinancialFlow): Promise<void> {
    await financialFlow.save();
  }

  public async createMany(financialFlows: StateFinancialFlow[]): Promise<void> {
    await StateFinancialFlow.createMany(financialFlows);
  }
}
