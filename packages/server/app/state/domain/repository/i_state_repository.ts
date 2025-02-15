import type State from '#state/domain/model/state';

export default abstract class IStateRepository {
  public abstract save(state: State): Promise<void>;
  public abstract createMany(states: State[]): Promise<void>;
  public abstract findById(id: number): Promise<State | null>;
  public abstract getById(id: number): Promise<State>;
}
