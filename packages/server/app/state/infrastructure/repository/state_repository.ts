import State from '#state/domain/model/state';

export class StateRepository {
  public async save(state: State): Promise<void> {
    await state.save();
  }

  public async saveMany(states: State[]): Promise<void> {
    states.forEach(state => state.save());
  }

  public async findById(id: number): Promise<State | null> {
    return State.find(id);
  }

  public async getById(id: number): Promise<State> {
    return await State.findOrFail(id);
  }
}
