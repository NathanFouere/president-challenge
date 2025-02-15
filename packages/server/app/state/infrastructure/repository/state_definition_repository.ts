import type IStateDefinitionRepository from '#state/domain/repository/i_state_definition_repository';
import StateDefinition from '#state/domain/model/state_definition';

export default class StateDefinitionRepository implements IStateDefinitionRepository {
  public async save(state: StateDefinition): Promise<void> {
    await state.save();
  }

  public async saveMany(states: StateDefinition[]): Promise<void> {
    states.forEach(state => state.save());
  }

  public async findById(id: number): Promise<StateDefinition | null> {
    return StateDefinition.find(id);
  }

  public async getById(id: number): Promise<StateDefinition> {
    return await StateDefinition.findOrFail(id);
  }

  public async findAll(): Promise<StateDefinition[]> {
    return await StateDefinition.all();
  }
}
