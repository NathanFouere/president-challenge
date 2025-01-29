import type StateFinancialFlow from '#state/domain/model/state_financial_flow';

export default abstract class IStateFinancialFlowRepository {
  public abstract save(financialFlow: StateFinancialFlow): Promise<void>;
  public abstract createMany(financialFlows: StateFinancialFlow[]): Promise<void>;
}
