import type FinancialFlow from '#state/domain/model/financial_flow';

export default abstract class IFinancialFlowRepository {
  public abstract save(financialFlow: FinancialFlow): Promise<void>;
  public abstract createMany(financialFlows: FinancialFlow[]): Promise<void>;
}
