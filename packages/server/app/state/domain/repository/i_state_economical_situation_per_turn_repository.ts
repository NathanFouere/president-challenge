import type StateEconomicalSituationPerTurn from '#state/domain/model/state_economical_situation_per_turn';

export default abstract class IStateEconomicalSituationPerTurnRepository {
  public abstract save(state: StateEconomicalSituationPerTurn): Promise<void>;
  public abstract saveMany(states: StateEconomicalSituationPerTurn[]): Promise<void>;
  public abstract findById(id: number): Promise<StateEconomicalSituationPerTurn | null>;
  public abstract getById(id: number): Promise<StateEconomicalSituationPerTurn>;
}
