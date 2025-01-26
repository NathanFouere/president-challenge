import type StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';

export default abstract class IStateEconomicalSituationPerTurnRepository {
  public abstract save(state: StateTurnFinancialFlows): Promise<void>;
  public abstract saveMany(states: StateTurnFinancialFlows[]): Promise<void>;
  public abstract findById(id: number): Promise<StateTurnFinancialFlows | null>;
  public abstract getById(id: number): Promise<StateTurnFinancialFlows>;
}
