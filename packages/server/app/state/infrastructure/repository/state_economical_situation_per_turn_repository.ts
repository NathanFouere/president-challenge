import StateEconomicalSituationPerTurn from '#state/domain/model/state_economical_situation_per_turn';

export class StateEconomicalSituationPerTurnRepository {
  public async save(state: StateEconomicalSituationPerTurn): Promise<void> {
    state.save();
  }

  public async saveMany(states: StateEconomicalSituationPerTurn[]): Promise<void> {
    states.forEach(state => state.save());
  }

  public async findById(id: number): Promise<StateEconomicalSituationPerTurn | null> {
    return StateEconomicalSituationPerTurn.find(id);
  }

  public async getById(id: number): Promise<StateEconomicalSituationPerTurn> {
    return await StateEconomicalSituationPerTurn.findOrFail(id);
  }
}
