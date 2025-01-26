import StateTurnFinancialFlows from '#state/domain/model/state_turn_financial_flows';
import type IStateEconomicalSituationPerTurnRepository
  from '#state/domain/repository/i_state_economical_situation_per_turn_repository';

export default class StateEconomicalSituationPerTurnRepository implements IStateEconomicalSituationPerTurnRepository {
  public async save(state: StateTurnFinancialFlows): Promise<void> {
    state.save();
  }

  public async saveMany(states: StateTurnFinancialFlows[]): Promise<void> {
    states.forEach(state => state.save());
  }

  public async findById(id: number): Promise<StateTurnFinancialFlows | null> {
    return StateTurnFinancialFlows.find(id);
  }

  public async getById(id: number): Promise<StateTurnFinancialFlows> {
    return await StateTurnFinancialFlows.findOrFail(id);
  }
}
