import type StateDefinition from '#state/domain/model/state_definition';

export default abstract class IStateDefinitionRepository {
  public abstract save(state: StateDefinition): Promise<void>;
  public abstract saveMany(states: StateDefinition[]): Promise<void>;
  public abstract findById(id: number): Promise<StateDefinition | null>;
  public abstract getById(id: number): Promise<StateDefinition>;
  public abstract findAll(): Promise<StateDefinition[]>;
}
