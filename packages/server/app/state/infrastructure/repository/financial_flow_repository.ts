import type IFinancialFlowRepository from '#state/domain/repository/i_financial_flow_repository';
import FinancialFlow from '#state/domain/model/financial_flow';

export default class FinancialFlowRepository implements IFinancialFlowRepository {
  public async save(financialFlow: FinancialFlow): Promise<void> {
    await financialFlow.save();
  }

  public async createMany(financialFlows: FinancialFlow[]): Promise<void> {
    await FinancialFlow.createMany(financialFlows);
  }
}
