import State from '#state/domain/model/state';
import type IStateRepository from '#state/domain/repository/i_state_repository';

export default class StateRepository implements IStateRepository {
  public async save(state: State): Promise<void> {
    await state.save();
  }

  public async createMany(states: State[]): Promise<void> {
    await State.createMany(states);
  }

  public async findById(id: number): Promise<State | null> {
    return State.find(id);
  }

  public async getById(id: number): Promise<State> {
    return await State.findOrFail(id);
  }
}
